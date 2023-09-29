<template>
  <v-card class="mx-auto" outlined width="100%">
    <v-card-title>
      <span class="subtitle-1">Sep 28 2023 18:53:02</span>
    </v-card-title>

    <v-card-text class="subtitle-1">
      "Turns out semicolon-less style is easier and safer in TS because most
      gotcha edge cases are type invalid as well." Lorem ipsum dolor sit amet,
      consectetur adipisicing elit. Ex deserunt est odit perferendis ipsa itaque
      fuga dolores necessitatibus explicabo repellat consequatur asperiores
      perspiciatis atque quam obcaecati quas, facilis rem in?
    </v-card-text>
    <v-list-item>
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        width="100%"
        src="https://picsum.photos/id/11/500/300"
      ></v-img>
    </v-list-item>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="h1">Evan You</v-list-item-title>
          <v-list-item-title>@EvanYou</v-list-item-title>
        </v-list-item-content>
        <v-row align="center" justify="end">
          <EditDialogComponent></EditDialogComponent>
          <DeleteDialog></DeleteDialog>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import EditDialogComponent from "./Dialogs/EditDialogComponent";
import DeleteDialog from "./Dialogs/DeleteDialog";

export default {
  components: { EditDialogComponent, DeleteDialog },
  data() {
    return {};
  },
};
</script>

<style></style>
