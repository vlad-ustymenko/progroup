import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksMainScreen extends Struct.ComponentSchema {
  collectionName: 'components_blocks_main_screens';
  info: {
    displayName: 'MainScreen';
  };
  attributes: {
    CompanyName: Schema.Attribute.String & Schema.Attribute.Required;
    companySubname: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.main-screen': BlocksMainScreen;
    }
  }
}
