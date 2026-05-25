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

export interface BlocksFaq extends Struct.ComponentSchema {
  collectionName: 'components_blocks_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    faq_list: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'>;
    sectionTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksMainScreen extends Struct.ComponentSchema {
  collectionName: 'components_blocks_main_screens';
  info: {
    displayName: 'MainScreen';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'components.button', true>;
    carousel: Schema.Attribute.Component<'components.main-carousel', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 3;
        },
        number
      >;
    companyName: Schema.Attribute.String & Schema.Attribute.Required;
    companySubname: Schema.Attribute.String & Schema.Attribute.Required;
    header: Schema.Attribute.Component<'components.header', true> &
      Schema.Attribute.Required;
    info: Schema.Attribute.Component<'components.info-main-screen', true>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ComponentsButton extends Struct.ComponentSchema {
  collectionName: 'components_components_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    link: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentsHeader extends Struct.ComponentSchema {
  collectionName: 'components_components_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    link: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentsInfoMainScreen extends Struct.ComponentSchema {
  collectionName: 'components_components_info_main_screens';
  info: {
    displayName: 'InfoMainScreen';
  };
  attributes: {
    symbol: Schema.Attribute.String;
    text: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentsMainCarousel extends Struct.ComponentSchema {
  collectionName: 'components_components_main_carousels';
  info: {
    displayName: 'MainCarousel';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.about': BlocksAbout;
      'blocks.advantages': BlocksAdvantages;
      'blocks.developer': BlocksDeveloper;
      'blocks.faq': BlocksFaq;
      'blocks.main-screen': BlocksMainScreen;
      'components.button': ComponentsButton;
      'components.header': ComponentsHeader;
      'components.info-main-screen': ComponentsInfoMainScreen;
      'components.main-carousel': ComponentsMainCarousel;
    }
  }
}
