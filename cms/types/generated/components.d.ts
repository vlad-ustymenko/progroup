import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAbout extends Struct.ComponentSchema {
  collectionName: 'components_blocks_abouts';
  info: {
    displayName: 'About';
  };
  attributes: {
    role1: Schema.Attribute.String & Schema.Attribute.Required;
    role1text: Schema.Attribute.Text & Schema.Attribute.Required;
    role2: Schema.Attribute.String & Schema.Attribute.Required;
    role2text: Schema.Attribute.Text & Schema.Attribute.Required;
    role3: Schema.Attribute.String & Schema.Attribute.Required;
    role3text: Schema.Attribute.Text & Schema.Attribute.Required;
    sectionSubtitle: Schema.Attribute.String & Schema.Attribute.Required;
    sectionTitle: Schema.Attribute.String & Schema.Attribute.Required;
    year1: Schema.Attribute.String & Schema.Attribute.Required;
    year2: Schema.Attribute.String & Schema.Attribute.Required;
    year3: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksAdvantages extends Struct.ComponentSchema {
  collectionName: 'components_blocks_advantages';
  info: {
    displayName: 'Advantages';
  };
  attributes: {
    new_cards: Schema.Attribute.Relation<'oneToMany', 'api::new-card.new-card'>;
  };
}

export interface BlocksDeveloper extends Struct.ComponentSchema {
  collectionName: 'components_blocks_developers';
  info: {
    displayName: 'Developer';
  };
  attributes: {
    description: Schema.Attribute.RichText & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface BlocksMainScreen extends Struct.ComponentSchema {
  collectionName: 'components_blocks_main_screens';
  info: {
    displayName: 'MainScreen';
  };
  attributes: {
    companyName: Schema.Attribute.String & Schema.Attribute.Required;
    companySubname: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.about': BlocksAbout;
      'blocks.advantages': BlocksAdvantages;
      'blocks.developer': BlocksDeveloper;
      'blocks.main-screen': BlocksMainScreen;
    }
  }
}
