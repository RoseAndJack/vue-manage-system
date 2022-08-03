<template>
  <div class="about">
    <v-header/>
    <v-sidebar/>
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <v-tags></v-tags>
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <component :is="Component"/>
            </keep-alive>
          </transition>
        </router-view>
        <!-- <el-backtop target=".content"></el-backtop> -->
      </div>
    </div>
  </div>
</template>
<script>
import {computed} from "vue";
import {useStore} from "vuex";
import vHeader from "../components/Header.vue";
import vSidebar from "../components/Sidebar.vue";
import vTags from "../components/Tags.vue";
import axios from "axios";
import JSEncrypt from "../utils/jsencrypt";

export default {
  components: {
    vHeader,
    vSidebar,
    vTags,
  },
  setup() {
    const data_url = 'http://localhost:8089/index';
    axios.get(data_url).then(response => {
      let en=new JSEncrypt();
      let key ='MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7iIMVHNiTZ0GQNvizj6AZSVfSmy57g1' +
          'FI/WD6AaeYGHt+3JImSfsWJF6ILQvHjLpltanfFvMqwHurnOgp+VMFB6pNl9Ux/vTi3x5MHX5c' +
          'OuPHwrFzml8UdfgF+SEwVdh2fJfqcUcimc05wmdPccl4VqZKi2bhNmo1H4zKW4YCXwIDAQAB';
      en.setPrivateKey(key);
      var decrypt = en.decrypt(response);
      console.log(decrypt)
    }).catch(function (error) {
      console.log(error);
    });

    const store = useStore();
    const tagsList = computed(() =>
        store.state.tagsList.map((item) => item.name)
    );
    const collapse = computed(() => store.state.collapse);
    return {
      tagsList,
      collapse,
    };
  },
  // load_data() {
  //   const data_url = 'http://localhost:8089/index';
  //   axios.get(data_url).then(response => {
  //     let result = response.data.result;
  //     console.log(result)
  //   }).catch(function (error) {
  //     console.log(error);
  //   })
  // },

};
</script>
