var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var eg;
(function (eg) {
    /// <reference path="../../Assets/Sizes/Size2d.ts" />
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Bounds/BoundingRectangle.ts" />
    /// <reference path="Shape.ts" />
    (function (Graphics) {
        /**
        * Defines a drawable rectangle.
        */
        var Rectangle = (function (_super) {
            __extends(Rectangle, _super);
            function Rectangle(x, y, width, height, color) {
                _super.call(this, new eg.Vector2d(x, y), color);
                this._type = "Rectangle";

                this.Size = new eg.Size2d(width, height);
            }
            /**
            * The bounding area that represents where the Rectangle will draw.
            */
            Rectangle.prototype.GetDrawBounds = function () {
                var bounds = new eg.Bounds.BoundingRectangle(this.Position, this.Size);

                bounds.Rotation = this.Rotation;

                return bounds;
            };

            Rectangle.prototype._BuildPath = function (context) {
                context.rect(-this.Size.HalfWidth(), -this.Size.HalfHeight(), this.Size.Width, this.Size.Height);
            };
            return Rectangle;
        })(Graphics.Abstractions.Shape);
        Graphics.Rectangle = Rectangle;
    })(eg.Graphics || (eg.Graphics = {}));
    var Graphics = eg.Graphics;
})(eg || (eg = {}));
