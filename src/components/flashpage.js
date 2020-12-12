import React, { Component } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";
import axios from "../services/Axios";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
    };
  }
  componentDidMount() {
    const { services } = this.state;
    axios
      .get(`getservices`) // axios returns a promise
      .then((response) => {
        console.log(response);
        this.setState({ services: response.data });
      })
      .catch(({ response }) => {});
  }

  render() {
    return (
      <html>
        <head>
          <style>
            <style
              dangerouslySetInnerHTML={{
                __html:
                  '\n\nbody {\n  font-family: "Libre Baskerville", serif;\n  font-weight: 400;\n  font-size: 16px;\n  line-height: 30px;\n  background-color: #0c0f15;\n  color: #ababab; }\n\n::-webkit-scrollbar {\n    width: 10px;\n    background-color: #F5F5F5;\n}\n\n::-webkit-scrollbar-thumb {\n    background-color: #f90a23;\n    background-image: -webkit-linear-gradient(45deg,rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);\n}\n\n::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\n    background-color: #F5F5F5;\n}\n\n.heading-page\n{\n      text-transform: uppercase;\n    font-size: 43px;\n    font-weight: bolder;\n    letter-spacing: 3px;\n    color: white;\n}\na {\n  color: inherit;\n  -webkit-transition: all 0.3s ease 0s;\n  -moz-transition: all 0.3s ease 0s;\n  -o-transition: all 0.3s ease 0s;\n  transition: all 0.3s ease 0s; }\n  a:hover, a:focus {\n    color: #ababab;\n    text-decoration: none;\n    outline: 0 none; }\n\nh1, h2, h3,\nh4, h5, h6 {\n  color: #1e2530;\n  font-family: "Open Sans", sans-serif;\n  margin: 0;\n  line-height: 1.3; }\n\np {\n  margin-bottom: 20px; }\n  p:last-child {\n    margin-bottom: 0; }\n\n/*\n * Selection color\n */\n::-moz-selection {\n  background-color: #FA6862;\n  color: #fff; }\n\n::selection {\n  background-color: #FA6862;\n  color: #fff; }\n\n/*\n *  Reset bootstrap\'s default style\n */\n.form-control::-webkit-input-placeholder,\n::-webkit-input-placeholder {\n  opacity: 1;\n  color: inherit; }\n\n.form-control:-moz-placeholder,\n:-moz-placeholder {\n  /* Firefox 18- */\n  opacity: 1;\n  color: inherit; }\n\n.form-control::-moz-placeholder,\n::-moz-placeholder {\n  /* Firefox 19+ */\n  opacity: 1;\n  color: inherit; }\n\n.form-control:-ms-input-placeholder,\n:-ms-input-placeholder {\n  opacity: 1;\n  color: inherit; }\n\nbutton, input, select,\ntextarea, label {\n  font-weight: 400; }\n\n.btn {\n  -webkit-transition: all 0.3s ease 0s;\n  -moz-transition: all 0.3s ease 0s;\n  -o-transition: all 0.3s ease 0s;\n  transition: all 0.3s ease 0s; }\n  .btn:hover, .btn:focus, .btn:active:focus {\n    outline: 0 none; }\n\n.btn-primary {\n  background-color: #FA6862;\n  border: 0;\n  font-family: "Open Sans", sans-serif;\n  font-weight: 700;\n  height: 48px;\n  line-height: 50px;\n  padding: 0 42px;\n  text-transform: uppercase; }\n  .btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary:active:focus {\n    background-color: #f9423a; }\n\n.btn-border {\n  border: 1px solid #d7d8db;\n  display: inline-block;\n  padding: 7px; }\n\n/*\n *  CSS Helper Class\n */\n.clear:before, .clear:after {\n  content: " ";\n  display: table; }\n\n.clear:after {\n  clear: both; }\n\n.pt-table {\n  display: table;\n  width: 100%;\n  height: -webkit-calc(100vh - 4px);\n  height: -moz-calc(100vh - 4px);\n  height: calc(100vh - 4px); }\n\n.pt-tablecell {\n  display: table-cell;\n  vertical-align: middle; }\n\n.overlay {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%; }\n\n.relative {\n  position: relative; }\n\n.primary,\n.link:hover {\n  color: #FA6862; }\n\n.no-gutter {\n  margin-left: 0;\n  margin-right: 0; }\n  .no-gutter > [class^="col-"] {\n    padding-left: 0;\n    padding-right: 0; }\n\n.flex {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex; }\n\n.flex-middle {\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -webkit-align-items: center;\n  -moz-align-items: center;\n  align-items: center; }\n\n.space-between {\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  -webkit-justify-content: space-between;\n  -moz-justify-content: space-between;\n  justify-content: space-between; }\n\n.nicescroll-cursors {\n  background: #FA6862 !important; }\n\n.preloader {\n  bottom: 0;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  z-index: 1000;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex; }\n  .preloader.active.hidden {\n    display: none; }\n\n.loading-mask {\n  background-color: #FA6862;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 20%;\n  -webkit-transition: all 0.6s cubic-bezier(0.61, 0, 0.6, 1) 0s;\n  -moz-transition: all 0.6s cubic-bezier(0.61, 0, 0.6, 1) 0s;\n  -o-transition: all 0.6s cubic-bezier(0.61, 0, 0.6, 1) 0s;\n  transition: all 0.6s cubic-bezier(0.61, 0, 0.6, 1) 0s; }\n  .loading-mask:nth-child(2) {\n    left: 20%;\n    -webkit-transition-delay: 0.1s;\n    -moz-transition-delay: 0.1s;\n    -o-transition-delay: 0.1s;\n    transition-delay: 0.1s; }\n  .loading-mask:nth-child(3) {\n    left: 40%;\n    -webkit-transition-delay: 0.2s;\n    -moz-transition-delay: 0.2s;\n    -o-transition-delay: 0.2s;\n    transition-delay: 0.2s; }\n  .loading-mask:nth-child(4) {\n    left: 60%;\n    -webkit-transition-delay: 0.3s;\n    -moz-transition-delay: 0.3s;\n    -o-transition-delay: 0.3s;\n    transition-delay: 0.3s; }\n  .loading-mask:nth-child(5) {\n    left: 80%;\n    -webkit-transition-delay: 0.4s;\n    -moz-transition-delay: 0.4s;\n    -o-transition-delay: 0.4s;\n    transition-delay: 0.4s; }\n\n.preloader.active.done {\n  z-index: 0; }\n\n.preloader.active .loading-mask {\n  width: 0; }\n\n/*------------------------------------------------\n\tStart Styling\n-------------------------------------------------*/\n.mt20{margin-top:20px;}\n.site-wrapper {\n  border-top: 4px solid #ff0037; }\n\n.page-close {\n  font-size: 30px;\n  position: absolute;\n  right: 30px;\n  top: 30px;\n  z-index: 100; }\n\n.page-title {\n  margin-bottom: 75px; }\n  .page-title img {\n    margin-bottom: 20px; }\n  .page-title h2 {\n    font-size: 68px;\n    margin-bottom: 25px;\n    position: relative;\n    z-index: 0;\n    font-weight: 900;\n    text-transform: uppercase; }\n  .page-title p {\n    font-size: 16px; }\n  .page-title .title-bg {\n    color: rgba(30, 37, 48, 0.07);\n    font-size: 158px;\n    left: 0;\n    letter-spacing: 10px;\n    line-height: 0.7;\n    position: absolute;\n    right: 0;\n    top: 50%;\n    z-index: -1;\n    -webkit-transform: translateY(-50%);\n    -moz-transform: translateY(-50%);\n    -ms-transform: translateY(-50%);\n    -o-transform: translateY(-50%);\n    transform: translateY(-50%); }\n\n.section-title {\n  margin-bottom: 20px; }\n  .section-title h3 {\n    display: inline-block;\n    position: relative; }\n    .section-title h3::before, .section-title h3::after {\n      content: "";\n      height: 2px;\n      position: absolute;\n      bottom: 8px;\n      left: -webkit-calc(100% + 14px);\n      left: -moz-calc(100% + 14px);\n      left: calc(100% + 14px); }\n    .section-title h3::before {\n      background-color: #1e2530;\n      width: 96px;\n      bottom: 14px; }\n    .section-title h3::after {\n      background-color: #FA6862;\n      width: 73px; }\n  .section-title.light h3 {\n    color: #fff; }\n    .section-title.light h3::before {\n      background-color: #fff; }\n\n.page-nav {\n  bottom: 40px;\n  left: 0;\n  position: absolute;\n  right: 0; }\n  .page-nav span {\n    font-family: "Open Sans", sans-serif;\n    font-size: 14px;\n    font-weight: 500;\n    line-height: 0.9;\n    text-transform: uppercase; }\n\n/*------------------------------------------------\n    Home Page\n-------------------------------------------------*/\n\n.hexagon-item:first-child {\n    margin-left: 0;\n}\n\n.page-home {\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  vertical-align: middle; }\n  .page-home .overlay {\n    background-color: rgba(14, 17, 24, 0.97);\n}\n\n/* End of container */\n.hexagon-item {\n  cursor: pointer;\n  width: 200px;\n  height: 173.20508px;\n  float: left;\n  margin-left: -29px;\n  z-index: 0;\n  position: relative;\n  -webkit-transform: rotate(30deg);\n  -moz-transform: rotate(30deg);\n  -ms-transform: rotate(30deg);\n  -o-transform: rotate(30deg);\n  transform: rotate(30deg); }\n  .hexagon-item:first-child {\n    margin-left: 0; }\n  .hexagon-item:hover {\n    z-index: 1; }\n    .hexagon-item:hover .hex-item:last-child {\n      opacity: 1;\n      -webkit-transform: scale(1.3);\n      -moz-transform: scale(1.3);\n      -ms-transform: scale(1.3);\n      -o-transform: scale(1.3);\n      transform: scale(1.3); }\n    .hexagon-item:hover .hex-item:first-child {\n      opacity: 1;\n      -webkit-transform: scale(1.2);\n      -moz-transform: scale(1.2);\n      -ms-transform: scale(1.2);\n      -o-transform: scale(1.2);\n      transform: scale(1.2); }\n      .hexagon-item:hover .hex-item:first-child div:before,\n      .hexagon-item:hover .hex-item:first-child div:after {\n        height: 5px; }\n    .hexagon-item:hover .hex-item div::before,\n    .hexagon-item:hover .hex-item div::after {\n      background-color: #ff0037; }\n    .hexagon-item:hover .hex-content svg {\n      -webkit-transform: scale(0.97);\n      -moz-transform: scale(0.97);\n      -ms-transform: scale(0.97);\n      -o-transform: scale(0.97);\n      transform: scale(0.97); }\n\n.page-home .hexagon-item:nth-last-child(1),\n.page-home .hexagon-item:nth-last-child(2),\n.page-home .hexagon-item:nth-last-child(3) {\n  -webkit-transform: rotate(30deg) translate(87px, -80px);\n  -moz-transform: rotate(30deg) translate(87px, -80px);\n  -ms-transform: rotate(30deg) translate(87px, -80px);\n  -o-transform: rotate(30deg) translate(87px, -80px);\n  transform: rotate(30deg) translate(87px, -80px); }\n\n.hex-item {\n  position: absolute;\n  top: 0;\n  left: 50px;\n  width: 100px;\n  height: 173.20508px; }\n  .hex-item:first-child {\n    z-index: 0;\n    -webkit-transform: scale(0.9);\n    -moz-transform: scale(0.9);\n    -ms-transform: scale(0.9);\n    -o-transform: scale(0.9);\n    transform: scale(0.9);\n    -webkit-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);\n    -moz-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);\n    -o-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);\n    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1); }\n  .hex-item:last-child {\n    transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);\n    z-index: 1; }\n  .hex-item div {\n    box-sizing: border-box;\n    position: absolute;\n    top: 0;\n    width: 100px;\n    height: 173.20508px;\n    -webkit-transform-origin: center center;\n    -moz-transform-origin: center center;\n    -ms-transform-origin: center center;\n    -o-transform-origin: center center;\n    transform-origin: center center; }\n    .hex-item div::before, .hex-item div::after {\n      background-color: #1e2530;\n      content: "";\n      position: absolute;\n      width: 100%;\n      height: 3px;\n      -webkit-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;\n      -moz-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;\n      -o-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;\n      transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s; }\n    .hex-item div:before {\n      top: 0; }\n    .hex-item div:after {\n      bottom: 0; }\n    .hex-item div:nth-child(1) {\n      -webkit-transform: rotate(0deg);\n      -moz-transform: rotate(0deg);\n      -ms-transform: rotate(0deg);\n      -o-transform: rotate(0deg);\n      transform: rotate(0deg); }\n    .hex-item div:nth-child(2) {\n      -webkit-transform: rotate(60deg);\n      -moz-transform: rotate(60deg);\n      -ms-transform: rotate(60deg);\n      -o-transform: rotate(60deg);\n      transform: rotate(60deg); }\n    .hex-item div:nth-child(3) {\n      -webkit-transform: rotate(120deg);\n      -moz-transform: rotate(120deg);\n      -ms-transform: rotate(120deg);\n      -o-transform: rotate(120deg);\n      transform: rotate(120deg); }\n\n.hex-content {\n  color: #fff;\n  display: block;\n  height: 180px;\n  margin: 0 auto;\n  position: relative;\n  text-align: center;\n  transform: rotate(-30deg);\n  width: 156px; }\n  .hex-content .hex-content-inner {\n    left: 50%;\n    margin: -3px 0 0 2px;\n    position: absolute;\n    top: 50%;\n    -webkit-transform: translate(-50%, -50%);\n    -moz-transform: translate(-50%, -50%);\n    -ms-transform: translate(-50%, -50%);\n    -o-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%); }\n  .hex-content .icon {\n    display: block;\n    font-size: 36px;\n    line-height: 30px;\n    margin-bottom: 11px; }\n  .hex-content .title {\n    display: block;\n    font-family: "Open Sans", sans-serif;\n    font-size: 14px;\n    letter-spacing: 1px;\n    line-height: 24px;\n    text-transform: uppercase; }\n  .hex-content svg {\n    left: -7px;\n    position: absolute;\n    top: -13px;\n    transform: scale(0.87);\n    z-index: -1;\n    -webkit-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;\n    -moz-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;\n    -o-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;\n    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s; }\n  .hex-content:hover {\n    color: #fff; }\n\n.page-home .hexagon-item:nth-last-child(1), .page-home .hexagon-item:nth-last-child(2), .page-home .hexagon-item:nth-last-child(3) {\n    -webkit-transform: rotate(30deg) translate(87px, -80px);\n    -moz-transform: rotate(30deg) translate(87px, -80px);\n    -ms-transform: rotate(30deg) translate(87px, -80px);\n    -o-transform: rotate(30deg) translate(87px, -80px);\n    transform: rotate(30deg) translate(87px, -80px);\n}\n/*------------------------------------------------\n    Welcome Page\n-------------------------------------------------*/\n.author-image-large {\n  position: absolute;\n  right: 0;\n  top: 0; }\n  .author-image-large img {\n    height: -webkit-calc(100vh - 4px);\n    height: -moz-calc(100vh - 4px);\n    height: calc(100vh - 4px); }\n\n\n@media (min-width: 1200px)\n{\n.col-lg-offset-2 {\n    margin-left: 16.66666667%;\n}\n}\n\n@media (min-width: 1200px)\n{\n.col-lg-8 {\n    width: 66.66666667%;\n}\n}\n\n.hexagon-item:first-child {\n    margin-left: 0;\n}\n\n.pt-table.desktop-768 .pt-tablecell {\n    padding-bottom: 110px;\n    padding-top: 60px;\n}\n\n\n\n.hexagon-item:hover .icon i\n{\n  color:#ff0037;\n  transition:0.6s;\n  \n}\n\n\n.hexagon-item:hover .title\n{\n  -webkit-animation: focus-in-contract 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;\n\t        animation: focus-in-contract 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;\n}\n/***************************/\n\n@-webkit-keyframes focus-in-contract {\n  0% {\n    letter-spacing: 1em;\n    -webkit-filter: blur(12px);\n            filter: blur(12px);\n    opacity: 0;\n  }\n  100% {\n    -webkit-filter: blur(0px);\n            filter: blur(0px);\n    opacity: 1;\n  }\n}\n@keyframes focus-in-contract {\n  0% {\n    letter-spacing: 1em;\n    -webkit-filter: blur(12px);\n            filter: blur(12px);\n    opacity: 0;\n  }\n  100% {\n    -webkit-filter: blur(0px);\n            filter: blur(0px);\n    opacity: 1;\n  }\n}\n\n\n\n\n\n@media only screen and (max-width: 767px)\n{\n.hexagon-item {\n    float: none;\n    margin: 0 auto 50px;\n}\n  .hexagon-item:first-child {\n    margin-left: auto;\n}\n  \n  .page-home .hexagon-item:nth-last-child(1), .page-home .hexagon-item:nth-last-child(2), .page-home .hexagon-item:nth-last-child(3) {\n    -webkit-transform: rotate(30deg) translate(0px, 0px);\n    -moz-transform: rotate(30deg) translate(0px, 0px);\n    -ms-transform: rotate(30deg) translate(0px, 0px);\n    -o-transform: rotate(30deg) translate(0px, 0px);\n    transform: rotate(30deg) translate(0px, 0px);\n}\n  \n}\n\n\n\n',
              }}
            />
          </style>
        </head>
        <body>
          <main className="site-wrapper">
            <div className="pt-table desktop-768">
              <div
                className="pt-tablecell page-home relative"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80)",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="overlay" />
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-2 col-lg-8">
                      <div className="page-title  home text-center">
                        <span className="heading-page"> </span>
                        <p className="mt20"></p>
                      </div>
                      {this.state.services &&
                        this.state.services.map((service) => {
                          return (
                            <div className="hexagon-menu clear">
                              <div className="hexagon-item">
                                <div className="hex-item">
                                  <div />
                                  <div />
                                  <div />
                                </div>

                                <div className="hex-item">
                                  <div />
                                  <div />
                                  <div />
                                </div>
                                <a
                                  href="https://enationalelectronics.com"
                                  target="_blank"
                                  className="hex-content"
                                >
                                  <span className="hex-content-inner">
                                    <span className="icon">
                                      <i className="fa fa-universal-access" />
                                    </span>
                                    <span className="title">
                                      {service.name}
                                    </span>
                                  </span>
                                  <svg
                                    viewBox="0 0 173.20508075688772 200"
                                    height={200}
                                    width={174}
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                                      fill="#1e2530"
                                    />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </body>
      </html>
    );
  }
}

export default PostList;
