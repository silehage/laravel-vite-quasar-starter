
<template>
    <q-layout view="lHh LpR fFf">
  
      <q-page-container>
        <q-page padding class="bg-primary flex flex-center">
          <div class="card-md column items-center">
            <a href="/">
              <img src="/assets/image/logo.png" alt="My Site" class="img-fluid q-mb-lg" style="max-width:140px;">
            </a>
            <slot></slot>
          </div>
        </q-page>
      </q-page-container>
  
    </q-layout>
</template>
  