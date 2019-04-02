var objects;
(function (objects) {
    class Bullet extends objects.GameObject {
        constructor(assetID, ownerId, direction, isCentered) {
            super(assetID, isCentered);
            this.ownerId = ownerId;
            this.direction = direction;
            this.hasCollisions = true;
            this.speed = 9.81;
            this.tag = "Bullet";
            this.name = `bullet_${this.GetId()}`;
            this.onCollision = this.OnBulletCollision;
        }
        setDirection(direction) {
            this.direction = direction;
        }
        getDirection() {
            return this.direction;
        }
        getOwner() {
            return this.ownerId;
        }
        Update() {
            super.Update();
            this.Offset((this.direction === "right" ? 1 : -1) * this.speed, 0);
        }
        OnBulletCollision(other) {
            this.Destroy();
        }
    }
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map