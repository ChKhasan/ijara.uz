<script setup>
import busRoutesApi from "~/api/busRoutesApi";
import { useSpeechRecognition } from "./VoisSearch";
const props = defineProps(["visible"]);
const emit = defineEmits(["close", "formHandle"]);
// const { recognitionResult, isRecording, startRecognition } = useSpeechRecognition(
//   "ru-RU"
// );
const recognitionResult = ref("");
const isRecording = ref(false);
const search = ref("");
let recognition = null;
const startRecognition = () => {
  if (!recognition) {
    const Speech = window.webkitSpeechRecognition;
    recognition = new Speech();
    recognition.lang = "uz-UZ";

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      isRecording.value = false;
      recognitionResult.value = text;
      search.value = text;
    };
    recognition.onend = () => {
      isRecording.value = false;
      onChange();
    };
  }
  recognition.start();
  isRecording.value = true;
};
const coords = ref([0, 0]);
const mapCenter = ref([41.31340266251607, 69.28703784942628]);
const zoom = ref(10);
const routes = ref([]);
const busRoute = ref([]);
const busRoute2 = ref([]);

const loadingBus = ref(false);
const searchLocations = ref([]);
const busRoutes = ref([]);
const metroWays = ref([]);
const activeBus = ref(0);
const radius = ref(500);
let allLocations = [];
const loadList = ref([1, 2, 3, 4, 5, 6]);

const onChange = (e) => {
  if (search.value.length > 0) {
    const formParams = {
      params: {
        format: "json",
        q: search.value,
      },
    };
    __SEARCH_LEAFLET(formParams);
  }
};
const handleBusRoute = (number) => {
  const formData = {
    params: {
      url: `https://uz.easyway.info/ajax/en/tashkent/routeInfo/${number}`,
    },
  };
  activeBus.value = number;
  __GET_BUS_ROUTE(formData);
};
function handleMapClick(e) {
  coords.value = Object.values(e.latlng);
  const coo = Object.values(e.latlng);
  const formData = {
    params: {
      url: `https://uz.easyway.info/ajax/en/tashkent/nearby/${coo[0]}/${coo[1]}/500`,
    },
  };
  const metroData = {
    start_lat: coo[0],
    start_lng: coo[1],
    stop_lat: coo[0] + 0.01,
    stop_lng: coo[1] + 0.01,
    direct: false,
    way_type: "optimal",
    transports: "metro,bus",
    enable_walk_ways: 0,
    url: "https://uz.easyway.info/ajax/en/tashkent/compile",
  };
  __GET_LOCATICON_TRANSPORTS(formData, metroData);
}
const __GET_LOCATICON_TRANSPORTS = async (formBusData, formMetroData) => {
  try {
    loadingBus.value = true;
    const [busData, metroData] = await Promise.all([
      busRoutesApi.getBusRoutes(formBusData),
      busRoutesApi.postBusRoutes(formMetroData),
    ]);
    routes.value = busData.data.routes;
    let allBusRoutes = [];
    let metroRoutes = [];
    let mashRoutes = [];
    busData.data.routes.forEach((elem) => {
      let currentBus = allLocations.find((item) => item.ri == elem && item.tn == "Bus");
      let currentMash = allLocations.find(
        (item) => item.ri == elem && item.tn == "Marshrutka"
      );
      let currentMetro = allLocations.find(
        (item) => item.ri == elem && item.tn == "Subway"
      );
      if (currentBus) allBusRoutes.push(currentBus);
      if (currentMetro) metroRoutes.push(currentMetro);
      if (currentMash) mashRoutes.push(currentMash);
    });
    console.log("bus", busRoutes);
    console.log("metro", metroRoutes);
    console.log("mash", mashRoutes);
    const metroWaysData = metroRoutes.map((item) => {
      return {
        name: item.rn,
        type: "METRO",
      };
    });
    const busRoutesData = allBusRoutes.map((item) => {
      return {
        name: item.rn,
        ri: item.ri,
        type: "BUS",
      };
    });
    metroWays.value = metroWaysData;
    busRoutes.value = busRoutesData;
    const transports = [...metroWaysData, ...busRoutesData];
    emit("formHandle", { transports: transports, coords: coords });
  } catch (e) {
    console.log(e);
  } finally {
    loadingBus.value = false;
  }
};
let formatTransports = [];
const __GET_ALL_LOCATICONS = async (formBusData) => {
  try {
    loadingBus.value = true;
    const busData = await busRoutesApi.getBusRoutes(formBusData);
    const locations = Object.values(busData?.data?.routes);
    allLocations = locations;
    // let types = {
    //   Bus: "BUS",
    //   Marshrutka: "MARSHUTKA",
    //   Subway: "METRO",
    // };
    // formatTransports = await allLocations.map((elem) => {
    //   return {
    //     name: elem.rn,
    //     type: types[elem.tn],
    //     ri: elem.ri
    //   };
    // });
    // console.log(formatTransports);
    // Promise.all([...formatTransports.map((trans) => __PORT_TRANSPORTS(trans))]);
  } catch (e) {
    console.log(e);
  } finally {
    loadingBus.value = false;
  }
};
// const __PORT_TRANSPORTS = async (formData) => {
//   try {
//     console.log(formData);
//     const data = await busRoutesApi.portTransport(formData);
//   } catch (e) {
//     errorHandle(e);
//   } finally {
//   }
// };
const __SEARCH_LEAFLET = async (formData) => {
  try {
    loadingBus.value = true;
    const data = await busRoutesApi.searchLeaflet(formData);
    searchLocations.value = data?.data;
  } catch (e) {
    errorHandle(e);
  } finally {
    loadingBus.value = false;
  }
};
const __GET_BUS_ROUTE = async (formData) => {
  try {
    const data = await busRoutesApi.getBusRoute(formData);
    busRoute.value = data.data.scheme.forward.split(" ").map((elem) => {
      return {
        lat: elem.split(",")[0],
        lng: elem.split(",")[1],
      };
    });
    busRoute2.value = data.data.scheme.backward.split(" ").map((elem) => {
      return {
        lat: elem.split(",")[0],
        lng: elem.split(",")[1],
      };
    });
  } catch (e) {
    errorHandle(e);
  } finally {
  }
};

const errorHandle = (error) => {
  error.response
    ? ElNotification({
        title: "Error",
        message: error.response.statusText,
        type: "error",
      })
    : ElNotification({
        title: "Error",
        message: "Serverda xatolik",
        type: "error",
      });
};
const close = () => {
  emit("close");
};
const testinc = () => {
  console.log("tezt");
};

const handleLocation = (location) => {
  coords.value = [location.lat, location.lon];
  mapCenter.value = [location.lat, location.lon];
  search.value = location.display_name;
  searchLocations.value = [];
  handleMapClick({ latlng: [location.lat, location.lon] });
};
onMounted(() => {
  const formData = {
    params: {
      url: `https://uz.easyway.info/ajax/en/tashkent/routes`,
    },
  };
  __GET_ALL_LOCATICONS(formData);
});
// useAsyncData("all_locations", async () => {
//   const formData = {
//     params: {
//       url: `https://uz.easyway.info/ajax/en/tashkent/routes`,
//     },
//   };
//   return __GET_ALL_LOCATICONS(formData);
// });
watch(
  () => recognitionResult,
  () => {
    search.value = recognitionResult.value;
  }
);

watch(
  () => search,
  () => onchange(),
  { immediate: false, deep: false, flush: "post" }
);
defineExpose({
  handleLocation,
});
const circleRadius = ref(500);
</script>
<template>
  <div>
    <el-dialog
      v-model="props.visible"
      :show-close="false"
      width="100%"
      height="100%"
      modal-class="auth-modal"
    >
      <div>
        <div class="map">
          <LMap
            ref="map"
            :zoom="zoom"
            :center="mapCenter"
            @click="handleMapClick"
            @zoomend="handleZoomEnd"
          >
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              layer-type="base"
              name="OpenStreetMap"
            />
            <l-marker :lat-lng="coords"><l-popup>Vash marker</l-popup> </l-marker>
            <l-polyline :lat-lngs="busRoute" :color="'#219FC8'" :weight="5"></l-polyline>
            <l-polyline :lat-lngs="busRoute2" :color="'#7AC335'" :weight="5"></l-polyline>
            <l-circle
              :lat-lng="coords"
              :radius="circleRadius"
              :color="'#777777'"
              :fill-color="'#777777'"
            ></l-circle>
          </LMap>
        </div>
        <div
          class="toolbar fixed h-[100vh] w-[450px] z-[1000] top-0 right-0 flex flex-col gap-6"
        >
          <el-button @click="close">Close</el-button>
          <div class="search rounded-2xl bg-white">
            <div class="search-input px-3 py-3 flex items-center pr-4">
              <el-input
                placeholder="Поиск на Картах"
                class="border-[0] w-full"
                v-model="search"
                @keyup.enter="onChange"
              />
              <div
                @click="startRecognition"
                class="recButton"
                :class="{ Rec: isRecording }"
              ></div>
            </div>
            <div
              class="search-results"
              :class="{ 'pb-4': searchLocations.length > 0 || loadingBus }"
            >
              <ul class="flex flex-col max-h-48 overflow-y-scroll" v-if="loadingBus">
                <li
                  v-for="loadCard in loadList"
                  :key="loadCard"
                  class="flex gap-4 px-3 leading-8 cursor-pointer items-center"
                >
                  <el-skeleton :rows="0" width="100%" class="w-full truncate" />
                </li>
              </ul>
              <ul class="flex flex-col gap-1 max-h-48 overflow-y-scroll" v-else>
                <li
                  v-for="location in searchLocations"
                  :key="location?.osm_id"
                  @click="handleLocation(location)"
                  class="flex gap-4 px-3 py-[6px] leading-8 cursor-pointer items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    fill="#000000"
                    height="21px"
                    width="21px"
                    version="1.1"
                    id="Capa_1"
                    viewBox="0 0 297 297"
                    xml:space="preserve"
                  >
                    <g>
                      <path
                        d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645   c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645   C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892   c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z"
                      />
                      <path
                        d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614   c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901   c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104   C179.265,127.948,165.464,141.901,148.5,141.901z"
                      />
                    </g>
                  </svg>
                  <p class="w-full truncate whitespace-nowrap">
                    {{ location?.display_name }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="transports px-3 py-3 rounded-2xl bg-white flex flex-col gap-4"
            v-if="routes.length > 0 || metroWays.length > 0"
          >
            <div v-if="routes.length > 0">
              <h4 class="text-black font-semibold mb-4 text-[16]">Автобусы поблизости</h4>
              <ul class="bus-list flex flex-wrap gap-2">
                <li
                  v-for="(bus, index) in busRoutes"
                  :key="index"
                  @click="handleBusRoute(bus.ri)"
                  class="rounded-[5px] w-8 h-8 flex items-center justify-center buses cursor-pointer"
                  :class="{ active: activeBus == bus }"
                >
                  {{ bus.name }}
                </li>
              </ul>
            </div>
            <div v-if="metroWays.length > 0">
              <h4 class="text-black font-semibold mb-4 text-[16]">
                Метро рядом с адресом
              </h4>
              <ul class="metro-list flex flex-wrap gap-2">
                <li
                  v-for="metro in metroWays"
                  :key="metro"
                  class="rounded-[5px] min-w-8 px-1 h-8 flex items-center justify-center cursor-pointer gap-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    fill="#000000"
                    height="21px"
                    width="21px"
                    version="1.1"
                    id="Capa_1"
                    viewBox="0 0 297 297"
                    xml:space="preserve"
                  >
                    <g>
                      <path
                        d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645   c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645   C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892   c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z"
                      />
                      <path
                        d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614   c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901   c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104   C179.265,127.948,165.464,141.901,148.5,141.901z"
                      />
                    </g>
                  </svg>
                  {{ metro.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span></span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="css" scoped>
:deep(.el-input__wrapper) {
  box-shadow: none;
}
:deep(.el-dialog) {
  margin-top: 0;
  margin-bottom: 0;
  height: 100vh;
  overflow: hidden;
}
:deep(.el-dialog__body) {
  padding: 0;
}
.map {
  height: 100vh;
}
.search {
  box-shadow: 0 0 2px rgb(0 0 0/20%), 0 -1px 0 rgb(0 0 0/2%);
}
.buses {
  transition: 0.2s;
  box-shadow: 0 0 2px rgb(0 0 0/20%), 0 -1px 0 rgb(0 0 0/2%);
}
.buses:hover {
  background-color: rgb(0 0 0/5%);
}
.bus-list .active {
  background-color: rgb(0 0 0/5%);
}
:deep(.el-input__wrapper:hover) {
  box-shadow: none;
}
.search ul li {
  transition: 0.3s linear;
}
.search ul li:hover {
  background-color: rgba(60, 64, 67, 0.04);
}
.search-results ul::-webkit-scrollbar {
  display: none;
}
.search-results :deep(.el-skeleton) {
  max-width: 100%;
}
.recButton {
  width: 20px;
  height: 20px;
  min-width: 20px;
  font-size: 0;
  background-color: red;
  border: 0;
  border-radius: 35px;
  position: relative;
  outline: none;
  cursor: pointer;
}

.notRec {
  background-color: darkred;
}

.Rec {
  animation-name: pulse;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes pulse {
  0% {
    box-shadow: 0px 0px 5px 0px rgba(173, 0, 0, 0.3);
  }
  65% {
    box-shadow: 0px 0px 5px 13px rgba(173, 0, 0, 0.3);
  }
  90% {
    box-shadow: 0px 0px 5px 13px rgba(173, 0, 0, 0);
  }
}
</style>
