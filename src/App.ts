/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2022 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Lightning, Utils } from "@lightningjs/sdk";

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: {
    Star: any;
    Pentagon: any;
    Elipse: any;
    Logo: object;
    Mystery: object;
    Text: object;
  };
  LeftButton: any;
  RightButton: any;
}

export class App
  extends Lightning.Component<AppTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec>
{
  private _starAnimation: Lightning.types.Animation | undefined;
  /*
   * The following properties exist to make it more convenient to access elements
   * below in a type-safe way. They are optional.
   *
   * See https://lightningjs.io/docs/#/lightning-core-reference/TypeScript/Components/TemplateSpecs?id=using-a-template-spec
   * for more information.
   */
  readonly Background = this.getByRef("Background")!;
  readonly Star = this.Background.getByRef("Star")!;

  _starAnimationStoped: Lightning.types.Animation | undefined = undefined;

  static override _template(): Lightning.Component.Template<AppTemplateSpec> {
    const rotate0 = Math.PI * 0;
    return {
      Background: {
        w: 1200,
        h: 600,
        Star: {
          mountX: 0.5,
          mountY: 1,
          x: 210,
          y: 600,
          src: Utils.asset("images/star-removebg.png"),
          type: Star,
          shader: { type: Lightning.shaders.Perspective, rx: rotate0 },
        },
        Pentagon: {
          mountX: 0.5,
          mountY: 1,
          x: 610,
          y: 570,
          scale: 0.7,
          src: Utils.asset("images/pentagon-removebg.png"),
          type: Pentagon,
        },
        Elipse: {
          mountX: 0.5,
          mountY: 1,
          x: 1110,
          y: 560,
          src: Utils.asset("images/elipse-removebg.png"),
          type: Elipse,
        },
        Mystery: {
          x: 930,
          y: 400,
          w: 150,
          h: 150,
          scale: 0,
          src: Utils.asset("images/mystery.png"),
        },
        Text: {
          mount: 0.5,
          x: 960,
          y: 720,
          text: {
            text: "Olá",
            fontFace: "Regular",
            fontSize: 64,
            textColor: 0xbbffffff,
          },
        },
      },
    };
  }

  override _init() {
    const rotate45 = Math.PI * 0.25;

    //Animations
    this._starAnimation = this.tag("Background.Star").animation({
      duration: 6,
      repeat: -1,
      stopMethod: "immediate",
      actions: [
        {
          p: "scaleX",
          v: { 0: { v: 1, s: 1 }, 0.5: { v: -1, s: 1 }, 1: { v: 1, s: 1 } },
        },
      ],
    });

    this._setState("Star");
    this._starAnimation?.start();
  }

  //State (focus) of the componets and their connections
  static override _states() {
    return [
      class Star extends this {
        override _getFocused() {
          this._starAnimation?.resume();
          return this.tag("Background.Star");
        }

        override _handleRight() {
          this._setState("Pentagon");
          this._starAnimation?.pause();
        }
      },
      class Pentagon extends this {
        override _getFocused() {
          return this.tag("Background.Pentagon");
        }

        override _handleLeft() {
          console.log(this._starAnimationStoped);
          this._starAnimation = this._starAnimationStoped;
          this._setState("Star");
        }

        override _handleRight() {
          this._setState("Elipse");
        }
      },
      class Elipse extends this {
        override _getFocused() {
          return this.tag("Background.Elipse");
        }

        override _handleLeft() {
          this._setState("Pentagon");
        }
      },
    ];
  }

  // static getFonts() {
  //   return [
  //     {
  //       family: "Regular",
  //       url: Utils.asset("fonts/Roboto-Regular.ttf") as string,
  //     },
  //   ];
  // }

  // override _handleEnter() {
  //   this.Logo.setSmooth("scale", 2, {
  //     duration: 2.5,
  //   });
  //   this.Text.setSmooth("y", 800, {
  //     duration: 2.5,
  //   });
  //   this.Text.setSmooth("alpha", 0, {
  //     duration: 2.5,
  //     timingFunction: "ease-out",
  //   });
  //   this.Mystery.smooth = {
  //     x: 1025,
  //     y: 550,
  //     scale: 1,
  //   };
  // }
}

class Pentagon extends Lightning.Component {
  override _focus() {
    //console.log("pentagon _focus");
    // this.patch({
    //   smooth: { color: 0xff763ffc },
    //   Label: {
    //     smooth: { color: 0xffffffff },
    //   },
    // });
  }

  override _unfocus() {
    //console.log("pentagon _unfocus");
    // this.patch({
    //   smooth: { color: 0xffffffff },
    //   Label: {
    //     smooth: { color: 0xff000000 },
    //   },
    // });
  }
}

class Elipse extends Lightning.Component {
  override _focus() {
    //console.log("elipse _focus");
    // this.patch({
    //   smooth: { color: 0xff763ffc },
    //   Label: {
    //     smooth: { color: 0xffffffff },
    //   },
    // });
  }

  override _unfocus() {
    //console.log("elipse _unfocus");
    // this.patch({
    //   smooth: { color: 0xffffffff },
    //   Label: {
    //     smooth: { color: 0xff000000 },
    //   },
    // });
  }
}

class Star extends Lightning.Component {
  override _focus() {
    //console.log("star _focus");
    // this.patch({
    //   smooth: { color: 0xff763ffc },
    //   Label: {
    //     smooth: { color: 0xffffffff },
    //   },
    // });
  }

  override _unfocus() {
    //console.log("star _unfocus");
    // this.patch({
    //   smooth: { color: 0xffffffff },
    //   Label: {
    //     smooth: { color: 0xff000000 },
    //   },
    // });
  }
}
