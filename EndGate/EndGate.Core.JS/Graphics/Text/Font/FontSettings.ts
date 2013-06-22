/// <reference path="FontFamily.ts" />
/// <reference path="FontVariant.ts" />
/// <reference path="FontStyle.ts" />

module eg.Graphics.Assets {

    /**
    * Defines a set of font settings that are used to modify the appearance of text that is drawn via Text2d's.
    */
    export class FontSettings {
        private _cachedState: { [property: string]: any; };
        private _cachedFont: string;
        private _refreshCache: bool;

        /**
        * Creates a new instance of the FontSettings object with the following default values.
        * FontSize: 10px
        * FontFamily: Times New Roman
        */
        constructor() {
            this._cachedState = {
                fontSize: "10px",
                fontFamily: FontFamily.TimesNewRoman,
                fontVariant: FontVariant.Normal,
                fontWeight: "",
                fontStyle: FontStyle.Normal
            };

            this._refreshCache = true;
            this._BuildFont();
        }

        /**
        * Gets the current font size.
        */
        public get FontSize(): string {
            return this._cachedState["fontSize"];
        }
        /**
        * Sets the current font size.  Expects values such as 20px.
        * @param size The new font size.
        */
        public set FontSize(size: string) {
            this._refreshCache = true;
            this._cachedState["fontSize"] = size;
        }

        /**
        * Gets the current font family.
        */
        public get FontFamily(): FontFamily {
            return this._cachedState["fontFamily"];
        }

        /**
        * Sets the current font family.
        * @param family The new font family.
        */
        public set FontFamily(family: FontFamily) {
            this._refreshCache = true;
            this._cachedState["fontFamily"] = family;
        }

        /**
        * Gets the current font variant.
        */
        public get FontVariant(): FontVariant {
            return this._cachedState["fontVariant"];
        }

        /**
        * Sets the current font variant.
        * @param variant The new font variant.
        */
        public set FontVariant(variant: FontVariant) {
            this._refreshCache = true;
            this._cachedState["fontVariant"] = variant;
        }

        /**
        * Gets the current font weight.
        */
        public get FontWeight(): string {
            return this._cachedState["fontWeight"];
        }

        /**
        * Sets the current font weight.
        * @param weight The new font weight.
        */
        public set FontWeight(weight: string) {
            this._refreshCache = true;
            this._cachedState["fontWeight"] = weight;
        }

        /**
        * Gets the current font style.
        */
        public get FontStyle(): FontStyle {
            return this._cachedState["fontStyle"];
        }

        /**
        * Sets and gets the current font style.
        * @param style The new font style.
        */
        public set FontStyle(style: FontStyle) {
            this._refreshCache = true;
            this._cachedState["fontStyle"] = style;
        }

        public _BuildFont(): string {
            var font;

            if (this._refreshCache) {
                font = this._cachedState["fontWeight"] + " " + FontStyle[this._cachedState["fontStyle"]].replace("Normal", "") + " " + FontVariant[this._cachedState["fontVariant"]].replace("Normal", "")+ " " + this._cachedState["fontSize"];

                if (this._cachedState["fontFamily"] !== undefined) {
                    font += " " + FontFamily[this._cachedState["fontFamily"]];
                }
                               
                this._cachedFont = font.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                this._refreshCache = false;
            }

            return this._cachedFont;
        }
    }
}
