<script setup>

  import { ref, onBeforeMount, onBeforeUnmount, computed, onMounted, provide } from 'vue'
  import { Inertia } from '@inertiajs/inertia' 
  import { usePage } from '@inertiajs/inertia-vue3'

  const leftDrawerOpen = ref(false)

  const page = usePage()

  const page_width = ref(window.innerWidth)

  const isMini = ref(false)

  const isDesktop = computed(() => {
    return page_width.value >= 768
  })

  const toggleLeftDrawer = () => {
    if(isDesktop.value) {
      leftDrawerOpen.value = true
      isMini.value = !isMini.value
    }else {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }
  }

  const pageResize = () => {
    page_width.value = window.innerWidth
  }

  onBeforeMount(() => {
    document.addEventListener('resize', pageResize)
  })
  onBeforeUnmount(() => {
    document.removeListener('resize', pageResize)
  })

  const brandName = computed(() => {
    if(isMini.value) return 'R'
    return 'Rocket Packet'
  })

  const menus = [
    { icon: 'ion-grid', route: 'dashboard', label: 'Dashboard' },
  ]

  const handleCickMenu = (menu) => {
    let path = menu.route
    if(menu.query) {
      Inertia.visit(route(path, menu.query))
    }else {
      Inertia.visit(route(path))

    }

    if(!isDesktop.value) {
      toggleLeftDrawer()
    }
  }

  const roleName = computed(() => {
    return page.props.value.auth.user.role_name
  })

  const permissions = computed(() => {
    return page.props.value.auth.permissions
  })

  const userCan = (guard) => {

    if(permissions.value && permissions.value.length) {
      if(permissions.value.includes('can-all')) {
        return true
      }
      return permissions.value.includes(guard)
    }

    return false
  }

  </script>

<template>
  <q-layout view="lHh LpR fFf">

    <q-header reveal bordered class="bg-white text-dark">
      <q-toolbar>
        <q-btn dense flat round icon="ion-menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
        </q-toolbar-title>
        <q-btn icon="ion-ios-log-out" round flat @click="$inertia.post(route('logout'))"></q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer 
      show-if-above
      v-model="leftDrawerOpen" 
      bordered
      :breakpoint="600"
      :width="250"
      :mini="isMini"
    >
    <q-scroll-area class="fit q-pb-xl">
      <q-list padding class="text-dark q-py-none side-menu">
        <q-item class="q-mb-md">
          <a class="logo" href="/">
            <img v-if="isMini" src="/assets/image/logo.png" alt="Mysite" class="img-fluid q-pa-xs">
            <div class="row items-center" v-else>
              <img src="/assets/image/logo.png" alt="Mysite" class="img-fluid q-pr-sm" style="max-width:60px">
              <div class="sitename">My Site</div>
            </div>
          </a>
        </q-item>
        <q-separator class="q-mb-md"></q-separator>
        <q-item header v-if="!isMini">Navigation</q-item>
        <template v-for="menu in menus" :key="menu.route">
          <q-item clickable v-ripple
          :active="route().current() == menu.route"
          @click="handleCickMenu(menu)"
          >
            <q-item-section side>
              <q-icon :name="menu.icon" />
            </q-item-section>
            
            <q-item-section>
              <q-item-label class="text-menu">{{ menu.label }}</q-item-label>
            </q-item-section>
            <q-tooltip v-if="isMini" anchor="center end" self="center start" class="bg-purple">{{ menu.label }}</q-tooltip>
          </q-item>
        </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page padding class="page-inner">
        <div class="bg-red-1 q-q-pa-sm q-mb-sm border-left-red row q-gutter-x-sm items-center" v-if=" $page.props.error_message">
          <q-icon name="error" size="22px" class="text-red-8"></q-icon>
          <div class="text-red-9">{{  $page.props.error_message }}</div>
        </div>
        <div class="bg-green-1 q-pa-sm q-mb-sm border-left-green row q-gutter-x-sm items-center" v-if=" $page.props.success_message">
         <q-icon name="check_circle" size="22px" class="text-green-8"></q-icon>
         <div class="text-green-9">{{  $page.props.success_message }}</div>
        </div>
          <slot></slot>
      </q-page>
    </q-page-container>

  </q-layout>
</template>
  