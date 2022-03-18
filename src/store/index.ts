import { reactive } from "vue";
import { History } from "@/types/history";
import { HistoriesKeyPairValue } from "@/types/history";
import fetcher from "@/objects/fetch";

export default reactive({
  state: {
    histories: {} as HistoriesKeyPairValue,
    searchHistories: {} as HistoriesKeyPairValue,
    searchFor: false,
    dataset: "",
    bands: "",
    scale: "",
    statistics: "",
    start_date: "",
    end_date: "",
  },

  fetch() {
    fetcher.cacheRequest(
      "http://165.232.134.108:5555/",
      "GET",
      null,
      undefined,
      (obj) => {
        if (obj.data.urls) {
          this.state.histories = {};
          obj.data.urls.forEach((url: string) => {
            fetcher.cacheRequest(url, "GET", null, undefined, (obj2) => {
              if (obj2.data) {
                this.state.histories[obj2.data.response.tx_hash] = obj2.data;
                this.state.histories[
                  obj2.data.response.tx_hash
                ].response.datetime = new Date(
                  this.state.histories[
                    obj2.data.response.tx_hash
                  ].response.datetime
                ).toString();
              }
            });
          });
        }
      }
    );
  },
});
