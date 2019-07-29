
//   /*     &_next {
//          width: 50px;
//          height: 100%;
//          display: none;
//          position: absolute;
//          right: 0;
//          background: blue;
//          z-index: 10;
//        }

//        &_wrapper {
//         //width: calc(100% - 2em - #{$projectHeaderGalleryGradientWidth});
//        width: 100%;
//        height: 100%;
//        padding: 0;
//         // padding-right: calc(1em + #{$projectHeaderGalleryGradientWidth});
//        overflow: hidden;
//        display: inline-block;
//        position: absolute;
//        top: 0;
//        left: 0;
//      }

//      &_list {
//        width: calc(100% - 2em);
//        padding: 1em;
//        height: calc(100% - 2em);
//        position: relative;
//        overflow-x: scroll;
//        overflow-y: hidden;

//        display: flex;
//        flex-direction: row;
//        flex-wrap: nowrap;
//        justify-content: flex-start;
//        align-items: center;

//        &__offset {
//          height: 100%;
//          display: block;
//          visibility: hidden;
//          width: $projectHeaderGalleryGradientWidth - 1em !important;
//          display: inline-block;
//        }
//      }

//      &_entry {
//        width: 115px;
//        height: 90px;
//        cursor: pointer;
//        overflow: hidden;
//        margin-right: 1em;
//        display: inline-block !important; // Lazy adds display:block; so this prevents that.
//        background-size: cover;
//        background-position: center center;

//        @include transition(100ms);
//        @include opacity(0.6);
//        @include border-radius($projectHeaderGalleryRadius);
//        @include flexbox_flex(0, 0, auto);
//        @include flexbox_alignSelf(auto);

//        &:hover {
//          @include opacity(0.8);
//        }
//      }
//    }

//    &_body {
//      z-index: 12;
//      height: 100%;
//      position: relative;
//      background: #fff;
//      padding: $projectBodyPadding_mobile;
//      padding-bottom: $projectBodyPadding_mobile + $projectLinksHeight;

//      @include large-up {
//        padding: $projectBodyPadding_desktop;
//        padding-bottom: $projectBodyPadding_desktop + $projectLinksHeight + $projectLinksTopMargin;
//      }

//      // When a card does not have links (we don't put the buttons down)
//      &_noLinks {
//        padding: $projectBodyPadding_mobile;
//        @include large-up {
//          padding: $projectBodyPadding_desktop;
//        }
//      }

//      &_title {
//        color: rgba(0, 0, 0, 1);
//        font-size: 1.4em;
//        font-weight: 500;
//        margin-bottom: 0.5em;
//        @include large-up {
//          margin-bottom: 0.6em;
//        }
//      }

//      &_subtitle {
//        color: rgba(0, 0, 0, 1);
//        font-size: 1em;
//        font-weight: 500;
//        margin-bottom: 0.5em;
//        @include large-up {
//          margin-bottom: 0.6em;
//        }
//      }

//      &_text {
//        font-size: 1em;
//        font-weight: 400;
//        line-height: 1.2em;
//        color: rgba(0,0,0,.8);
//        color: rgba(0, 0, 0, .7);
//        margin-bottom: 1em;
//        line-height: 1.3em;
//      }
//    }

//    &_highlight {
//      display: block;
//      margin-bottom: 1em;

//      &_list {
//        list-style: none;
//        vertical-align: top;
//        margin: -0.3em 0;
//        display: block;
//      }

//      &_entry {
//        width: 100%;
//        min-height: 18px;
//         // max-height: 36px;
//        display: inline-block;
  //       vertical-align: top;
  //       position: relative;
  //       margin: 0.5em 0;
  //       margin-right: 0;

  //       @include large-up {}

  //       &_icon {
  //         left: 0;
  //         top: 3px;
  //         position: absolute;
  //         display: inline-block;
  //         color: $primaryColor;
  //         vertical-align: top;
  //       }
  //       &_text {
  //         display: inline-block;
  //         vertical-align: middle;
  //         margin-left: 25px;
  //         font-size: 1em;
  //         line-height: 1.3em;
  //         position: relative;
  //         color: #333;
  //         color: rgba(0, 0, 0, .7);

  //          a {
  //            font-weight: 300;
  //            color: rgba(255, 255, 255, 0.8);
  //            color: $primaryColor;
  //          }
  //       }
  //     }
  //   }

  //   &_stack {
  //     // margin-bottom: 0.5em;
  //     margin-top: 1.3em;
  //     display: block;

  //     &_list {
  //       list-style: none;
  //       display: block;
  //       margin-top: -1em; // remove first entry margin top
  //     }
  //     &_entry {
  //       margin-top: 1em;
  //       margin-right: 1em;
  //       display: inline-block;
  //       color: rgba(0, 0, 0, 0.6);
  //       text-align: center;
  //       font-size: 0.8em;
  //     }
  //     &_title {
  //       font-size: 0.9em;
  //       color: rgba(0, 0, 0, 0.6);
  //       text-transform: capitalize;
  //     }
  //   }

  //   &_people {
  //     display: inline-block;
  //     margin-bottom: 1.5em;
  //     vertical-align: top;

  //     &_list {
  //       list-style: none;
  //       display: block;
  //     }
  //     &_entry {
  //       margin: 0.3em;
  //       margin-right: 0.4em;
  //       display: inline-block;

  //       &_avatar {
  //         width: 36px;
  //         height: 36px;
  //         display: inline-block;
  //         vertical-align: middle;
  //         background-color: #f4f4f4;
  //         @include border-radius(100%);
  //       }
  //     }
  //     &_link {
  //       display: block;
  //       border: 1px solid #f4f4f4;
  //       @include border-radius(60px);
  //     }
  //     &_title {
  //       margin-left: 10px;
  //       margin-right: 12px;
  //       font-size: 12px;
  //       color: rgba(0, 0, 0, .8);
  //       display: inline-block;
  //       vertical-align: middle;
  //       text-transform: capitalize;
  //     }
  //   }

  //   &_links {
  //     z-index: 12;
  //     overflow: hidden;
  //     position: absolute;
  //     min-height: $projectLinksHeight;
  //     left: $projectBodyPadding_mobile;
  //     bottom: $projectBodyPadding_mobile;
  //     @include large-up {
  //       left: $projectBodyPadding_desktop;
  //       bottom: $projectBodyPadding_desktop;
  //     }
  //     a:last-child {
  //       margin-bottom: 0;
  //     }
  //     a {
  //       color: #fff;
  //       font-weight: 600;
  //       margin-right: 1em;
  //       padding: 0.8em 1em;
  //       position: relative;
  //       text-align: center;
  //       display: inline-block;
  //       text-decoration: none;
  //       border: 2px solid #d83902;
  //       @include border-radius(60px);
  //       @include transition(all 0.5s);
  //       &:hover {
  //         background: #f7f7f7;
  //       }
  //     }
  //     &_code {
  //       // background: #f4f4f4 !important;
  //       color: #8b8b8b !important;
  //       border-color:#cecece !important;
  //       &:hover {
  //         background: #ebebeb !important;
  //       }
  //     }
  //   }
