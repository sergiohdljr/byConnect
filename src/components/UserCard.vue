<template>
  <v-card class="mx-auto" max-width="600" width="100%" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          Nome <v-icon>mdi-eye-off</v-icon> <v-icon>mdi-eye</v-icon>
          <div class="text-overline mb-4">@username</div>
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn outlined rounded text>visualizar perfil de Usuário </v-btn>
    </v-card-actions>
  </v-card>
</template>
