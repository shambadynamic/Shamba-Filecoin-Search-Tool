import { reactive } from "vue";
import { History } from "@/types/history";
import { KeyPair } from "@/types/history";
import fetcher from "@/objects/fetch";

const store = {
  state: {
    histories: {} as KeyPair<History>,
    searchHistories: {} as KeyPair<History>,
    get getSearchHistories() {
      if (this.activeHistory === "ALL") {
        return this.searchHistories;
      }
      const ret: any = {};
      for (const key in this.searchHistories) {
        if (Object.prototype.hasOwnProperty.call(this.searchHistories, key)) {
          const history = this.searchHistories[key];
          if (store.isActive(history)) {
            ret[key] = history;
          }
        }
      }
      return ret;
    },
    activeHistory: "ALL" as "FIRE" | "GEOSTATS" | "ALL",
    loading: true,
    searchFor: false,
    dataset: "",
    bands: "",
    scale: "",
    statistics: "",
    start_date: "",
    end_date: "",
  },

  isActive(history: History): boolean {
    if (
      this.state.activeHistory === "ALL" ||
      (this.state.activeHistory === "FIRE" &&
        this.isOfTypeFire(history.response.result)) ||
      (this.state.activeHistory === "GEOSTATS" &&
        !this.isOfTypeFire(history.response.result))
    ) {
      return true;
    }
    return false;
  },

  isOfTypeFire(result: History["response"]["result"]): boolean {
    if (typeof result === "number") return false;
    return true;
  },

  fetch() {
    fetcher
      .req<{ urls: string[] }>(
        "https://europe-west6-shamba-vpc-host-nonprod.cloudfunctions.net/shamba-common-external-adapter",
        "GET"
      )
      .then(async (resourceArray) => {
        if (resourceArray.data) {
          this.state.histories = {};
          const count = resourceArray.data.urls.length;
          if (count === 0) {
            this.state.loading = false;
          }
          for (let i = 0; i < count; i++) {
            const url = resourceArray.data.urls[i];
            const history = await fetcher.req<History>(url, "GET");
            if (history.data) {
              history.data.response.datetime = new Date(
                history.data.response.datetime
              ).toString();
              this.state.histories[history.data.response.tx_hash] =
                history.data;
              if (i === count - 1) {
                this.state.loading = false;
              }
            }
          }
        }
      });
  },
};

export default reactive(store);
