import { reactive } from "vue";
import { History, FireHistory } from "@/types/history";
import { KeyPair } from "@/types/history";
import fetcher from "@/objects/fetch";

export default reactive({
  state: {
    histories: {} as KeyPair<History>,
    fireHistories: {} as KeyPair<FireHistory>,
    searchHistories: {} as KeyPair<History> | KeyPair<FireHistory>,
    get getSearchHistories() {
      if (this.activeHistory === "ALL") {
        return this.searchHistories;
      }
      const ret: any = {};
      for (const key in this.searchHistories) {
        if (Object.prototype.hasOwnProperty.call(this.searchHistories, key)) {
          const history = this.searchHistories[key];
          if (history.type && history.type === this.activeHistory) {
            ret[key] = history;
          }
        }
      }
      return ret;
    },
    activeHistory: "ALL" as "FIRE" | "GEO-SPATIAL" | "ALL",
    get getActiveHistories() {
      let h: any = {};
      if (this.activeHistory === "FIRE") {
        h = this.fireHistories;
      } else if (this.activeHistory === "GEO-SPATIAL") {
        h = this.histories;
      } else {
        h = { ...this.histories, ...this.fireHistories };
      }
      return h;
    },
    searchFor: false,
    dataset: "",
    bands: "",
    scale: "",
    statistics: "",
    start_date: "",
    end_date: "",
  },

  fetchGeoSpatial() {
    fetcher.cacheRequest<{ urls: string[] }>(
      "http://165.232.134.108:5555/",
      "GET",
      null,
      undefined,
      (obj) => {
        if (obj.data) {
          this.state.histories = {};
          obj.data.urls.forEach((url: string) => {
            fetcher.cacheRequest<History>(
              url,
              "GET",
              null,
              undefined,
              (obj2) => {
                if (obj2.data) {
                  obj2.data.response.datetime = new Date(
                    obj2.data.response.datetime
                  ).toString();
                  obj2.data.type = "GEO-SPATIAL";
                  this.state.histories[obj2.data.response.tx_hash] = obj2.data;
                }
              }
            );
          });
        }
      }
    );
  },

  fetchFire() {
    fetcher.cacheRequest<{ urls: string[] }>(
      "http://165.232.134.108:5556/",
      "GET",
      null,
      undefined,
      (obj) => {
        if (obj.data) {
          this.state.fireHistories = {};
          obj.data.urls.forEach((url: string) => {
            fetcher.cacheRequest<FireHistory>(
              url,
              "GET",
              null,
              undefined,
              (obj2) => {
                if (obj2.data) {
                  obj2.data.response.datetime = new Date(
                    obj2.data.response.datetime
                  ).toString();
                  obj2.data.type = "FIRE";
                  this.state.fireHistories[obj2.data.response.tx_hash] =
                    obj2.data;
                }
              }
            );
          });
        }
      }
    );
  },

  fetch() {
    this.fetchGeoSpatial();
    this.fetchFire();
  },
});
