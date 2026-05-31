import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAbout extends Struct.ComponentSchema {
  collectionName: 'components_blocks_abouts';
  info: {
    displayName: 'About';
  };
  attributes: {
    blockTitle: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    role1: Schema.Attribute.String & Schema.Attribute.Required;
    role1text: Schema.Attribute.Text & Schema.Attribute.Required;
    role2: Schema.Attribute.String & Schema.Attribute.Required;
    role2text: Schema.Attribute.Text & Schema.Attribute.Required;
    role3: Schema.Attribute.String & Schema.Attribute.Required;
    role3text: Schema.Attribute.Text & Schema.Attribute.Required;
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
    advantages_cards: Schema.Attribute.Relation<
      'oneToMany',
      'api::advantages-card.advantages-card'
    >;
    blockTitle: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.RichText & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksDeveloper extends Struct.ComponentSchema {
  collectionName: 'components_blocks_developers';
  info: {
    displayName: 'Developer';
  };
  attributes: {
    blockTitle: Schema.Attribute.String & Schema.Attribute.Required;
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
    blockTitle: Schema.Attribute.String & Schema.Attribute.Required;
    button: Schema.Attribute.Component<'components.button', false> &
      Schema.Attribute.Required;
    faq_list: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'>;
    infoText: Schema.Attribute.String & Schema.Attribute.Required;
    infoTitle: Schema.Attribute.String & Schema.Attribute.Required;
    sectionTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksFooter extends Struct.ComponentSchema {
  collectionName: 'components_blocks_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    address: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Address'>;
    addressLink: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
    copyright: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Copyright text'>;
    developerInfo: Schema.Attribute.Component<
      'components.footer-developer-info',
      true
    > &
      Schema.Attribute.Required;
    developerTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Developer Title'>;
    facebookLink: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
    faqInfo: Schema.Attribute.Component<
      'components.footer-developer-info',
      true
    > &
      Schema.Attribute.Required;
    faqTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Faq Title'>;
    instagramLink: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
    telegramLink: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
    time: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Time'>;
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
          max: 5;
          min: 5;
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

export interface BlocksNews extends Struct.ComponentSchema {
  collectionName: 'components_blocks_news';
  info: {
    displayName: 'News';
  };
  attributes: {
    blockTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Block title'>;
    news_cards: Schema.Attribute.Relation<
      'oneToMany',
      'api::news-card.news-card'
    >;
    subtitle: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Subtitle'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Title'>;
  };
}

export interface BlocksProjects extends Struct.ComponentSchema {
  collectionName: 'components_blocks_projects';
  info: {
    displayName: 'Projects';
  };
  attributes: {
    blockTitle: Schema.Attribute.String & Schema.Attribute.Required;
    projects: Schema.Attribute.Relation<'oneToMany', 'api::project.project'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentsAdvantagesDetails extends Struct.ComponentSchema {
  collectionName: 'components_components_advantages_details';
  info: {
    displayName: 'AdvantCardDetail';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface ComponentsFooterDeveloperInfo extends Struct.ComponentSchema {
  collectionName: 'components_components_footer_developer_infos';
  info: {
    displayName: 'footerInfoLinks';
  };
  attributes: {
    link: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Title'>;
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
      'blocks.footer': BlocksFooter;
      'blocks.main-screen': BlocksMainScreen;
      'blocks.news': BlocksNews;
      'blocks.projects': BlocksProjects;
      'components.advantages-details': ComponentsAdvantagesDetails;
      'components.button': ComponentsButton;
      'components.footer-developer-info': ComponentsFooterDeveloperInfo;
      'components.header': ComponentsHeader;
      'components.info-main-screen': ComponentsInfoMainScreen;
      'components.main-carousel': ComponentsMainCarousel;
    }
  }
}
