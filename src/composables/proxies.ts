import { PROXY_TAB_TYPE } from '@/constant'
import { configs } from '@/store/config'
import {
  GLOBAL,
  hiddenGroupMap,
  proxyGroupList,
  proxyMap,
  proxyProviederList,
} from '@/store/proxies'
import { manageHiddenGroup } from '@/store/settings'
import { isEmpty } from 'lodash'
import { computed, ref } from 'vue'

export const proxiesFilter = ref('')

const proxiesTabShow = ref(PROXY_TAB_TYPE.PROXIES)
const renderGroups = computed(() => {
  if (isEmpty(proxyMap.value)) {
    return []
  }

  if (proxiesTabShow.value === PROXY_TAB_TYPE.PROVIDER) {
    return proxyProviederList.value.map((group) => group.name)
  }

  if (configs.value?.mode.toUpperCase() === GLOBAL) {
    return [GLOBAL]
  }

  return manageHiddenGroup.value
    ? proxyGroupList.value
    : proxyGroupList.value.filter((name) => !hiddenGroupMap.value[name])
})

export const useProxies = () => {
  return {
    proxiesTabShow,
    renderGroups,
  }
}
