<template>
  <div class="accordion" v-if="Object.keys(props.histories).length > 0">
    <div
      v-for="(history, i) in props.histories"
      :key="i"
      class="accordion-item"
    >
      <h2 class="accordion-header" :id="'panelsStayOpen-headingOne_' + i">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#panelsStayOpen-collapseOne_' + i"
          aria-expanded="true"
          :aria-controls="'panelsStayOpen-collapseOne_' + i"
        >
          <div
            style="
              text-overflow: ellipsis;
              overflow: hidden;
              width: 100%;
              display: flex;
            "
            class="me-2"
            :class="history.type === 'FIRE' ? 'text-danger' : 'text-success'"
          >
            {{ history.response.tx_hash }}
            <small
              :class="history.type === 'FIRE' ? 'bg-danger' : 'bg-success'"
              class="ms-auto text-white ps-2 pt-1 pb-1 pe-2 rounded-pill d-inline-block d-none d-lg-block"
              >{{ history.type }}</small
            >
          </div>
        </button>
      </h2>
      <div
        :id="'panelsStayOpen-collapseOne_' + i"
        class="accordion-collapse collapse"
        :aria-labelledby="'panelsStayOpen-headingOne_' + i"
      >
        <div>
          <pre v-html="prettyPrint(history)"></pre>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="alert alert-info">No record found!</div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { History, FireHistory, KeyPair } from "@/types/history";

const props = defineProps<{
  histories: KeyPair<History> | KeyPair<FireHistory>;
}>();

function replacer(
  match: any,
  pIndent: string,
  pKey: string,
  pVal: Array<any>,
  pEnd: string
) {
  var key = '<span class=json-key>"';
  var val = "<span class=json-value>";
  var str = "<span class=json-string>";
  var r = pIndent || "";
  if (pKey) r = r + key + pKey.replace(/[": ]/g, "") + '"</span>: ';
  if (pVal) r = r + (pVal[0] == '"' ? str : val) + pVal + "</span>";
  return r + (pEnd || "");
}

function prettyPrint(obj: any) {
  var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*|\[\]|{})?([,[{])?$/gm;
  return JSON.stringify(obj, null, 3)
    .replace(/&/g, "&amp;")
    .replace(/\\"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(jsonLine, replacer);
}
</script>
