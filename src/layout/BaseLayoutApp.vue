<template>
  <v-theme-provider root>
    <v-app>
      <v-main>
        <slot v-if="$store.state.auth.user" name="navigation"></slot>
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="12" sm="11" md="8" lg="6">
              <slot name="content"></slot>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </v-theme-provider>
</template>
<script></script>
