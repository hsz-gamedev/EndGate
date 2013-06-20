var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var eg;
(function (eg) {
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../Graphic2d.ts" />
    /// <reference path="../../Utilities/NoopTripInvoker.ts" />
    /// <reference path="../../Bounds/BoundingRectangle.ts" />
    /// <reference path="Font/FontSettings.ts" />
    (function (Graphics) {
        /**
        * Defines a drawable text element.
        */
        var Text2d = (function (_super) {
            __extends(Text2d, _super);
            function Text2d(x, y, text, color) {
                if (typeof color === "undefined") { color = "black"; }
                var _this = this;
                _super.call(this, new eg.Vector2d(x, y));
                this._type = "Text2d";

                this._text = text;
                this._stroker = new eg._.Utilities.NoopTripInvoker(function (context) {
                    context.strokeText(_this._text, 0, 0);
                });

                this._drawBounds = new eg.Bounds.BoundingRectangle(this.Position, eg.Size2d.One());
                this._recalculateBoundsSize = true;

                this._fontSettings = new Graphics.Assets.FontSettings();
                this.Align("center");
                this.Baseline("middle");
                this.Color(color);
            }
            Text2d.prototype.Align = function (alignment) {
                return this._State.TextAlign(alignment);
            };

            Text2d.prototype.Baseline = function (baseline) {
                return this._State.TextBaseline(baseline);
            };

            Text2d.prototype.Color = function (color) {
                return this._State.FillStyle(color);
            };

            Text2d.prototype.Shadow = function (x, y, color, blur) {
                this.ShadowX(x);
                this.ShadowY(y);
                this.ShadowColor(color);
                this.ShadowBlur(blur);
            };

            Text2d.prototype.ShadowColor = function (color) {
                return this._State.ShadowColor(color);
            };

            Text2d.prototype.ShadowX = function (x) {
                return this._State.ShadowOffsetX(x);
            };

            Text2d.prototype.ShadowY = function (y) {
                return this._State.ShadowOffsetY(y);
            };

            Text2d.prototype.ShadowBlur = function (blur) {
                return this._State.ShadowBlur(blur);
            };

            Text2d.prototype.Opacity = function (alpha) {
                return this._State.GlobalAlpha(alpha);
            };

            /**
            * Gets the Text2d's FontSetting's.
            */
            Text2d.prototype.FontSettings = function () {
                this._recalculateBoundsSize = true;

                return this._fontSettings;
            };

            Text2d.prototype.Text = function (text) {
                if (typeof text !== "undefined") {
                    this._recalculateBoundsSize = true;
                    this._text = text;
                }

                return this._text;
            };

            /**
            * Sets the current borders thickness and color.
            * @param thickness The new border thickness in pixels.
            * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
            */
            Text2d.prototype.Border = function (thickness, color) {
                this.BorderThickness(thickness);
                this.BorderColor(color);
            };

            Text2d.prototype.BorderThickness = function (thickness) {
                if (thickness === 0) {
                    this._stroker.Reset();
                } else {
                    this._stroker.Trip();
                }

                return this._State.LineWidth(thickness);
            };

            Text2d.prototype.BorderColor = function (color) {
                this._stroker.Trip();
                return this._State.StrokeStyle(color);
            };

            /**
            * Draws the text onto the given context.  If this Text2d is part of a scene the Draw function will be called automatically.
            * @param context The canvas context to draw the text onto.
            */
            Text2d.prototype.Draw = function (context) {
                var textSize;

                _super.prototype._StartDraw.call(this, context);

                this._State.Font(this._fontSettings._BuildFont());

                context.fillText(this._text, 0, 0);
                this._stroker.Invoke(context);

                _super.prototype._EndDraw.call(this, context);

                if (this._recalculateBoundsSize) {
                    this._recalculateBoundsSize = false;
                    textSize = context.measureText(this._text);
                    this._drawBounds.Size.Width = textSize.width;
                    this._drawBounds.Size.Height = parseInt(this._fontSettings.FontSize()) * 1.5;
                }
            };

            /**
            * The bounding area that represents where the Text2d will draw.
            */
            Text2d.prototype.GetDrawBounds = function () {
                this._drawBounds.Rotation = this.Rotation;
                this._drawBounds.Position = this.Position;

                return this._drawBounds;
            };
            return Text2d;
        })(Graphics.Abstractions.Graphic2d);
        Graphics.Text2d = Text2d;
    })(eg.Graphics || (eg.Graphics = {}));
    var Graphics = eg.Graphics;
})(eg || (eg = {}));
