class Boid {
    constructor(x, y) {
        this.position = { x, y };
        this.velocity = {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1
        };
        this.acceleration = { x: 0, y: 0 };
        this.maxForce = 0.2;
        this.maxSpeed = 4;
    }

    edges(width, height) {
        if (this.position.x > width) this.position.x = 0;
        else if (this.position.x < 0) this.position.x = width;
        if (this.position.y > height) this.position.y = 0;
        else if (this.position.y < 0) this.position.y = height;
    }

    align(boids) {
        let perceptionRadius = 50;
        let steering = { x: 0, y: 0 };
        let total = 0;

        for (let other of boids) {
            let d = Math.hypot(
                this.position.x - other.position.x,
                this.position.y - other.position.y
            );
            if (other !== this && d < perceptionRadius) {
                steering.x += other.velocity.x;
                steering.y += other.velocity.y;
                total++;
            }
        }

        if (total > 0) {
            steering.x /= total;
            steering.y /= total;

            let mag = Math.hypot(steering.x, steering.y);
            if (mag > 0) {
                steering.x = (steering.x / mag) * this.maxSpeed;
                steering.y = (steering.y / mag) * this.maxSpeed;
                steering.x -= this.velocity.x;
                steering.y -= this.velocity.y;
                let steerMag = Math.hypot(steering.x, steering.y);
                if (steerMag > this.maxForce) {
                    steering.x = (steering.x / steerMag) * this.maxForce;
                    steering.y = (steering.y / steerMag) * this.maxForce;
                }
            }
        }
        return steering;
    }

    cohesion(boids) {
        let perceptionRadius = 50;
        let steering = { x: 0, y: 0 };
        let total = 0;

        for (let other of boids) {
            let d = Math.hypot(
                this.position.x - other.position.x,
                this.position.y - other.position.y
            );
            if (other !== this && d < perceptionRadius) {
                steering.x += other.position.x;
                steering.y += other.position.y;
                total++;
            }
        }

        if (total > 0) {
            steering.x /= total;
            steering.y /= total;
            steering.x -= this.position.x;
            steering.y -= this.position.y;

            let mag = Math.hypot(steering.x, steering.y);
            if (mag > 0) {
                steering.x = (steering.x / mag) * this.maxSpeed;
                steering.y = (steering.y / mag) * this.maxSpeed;
                steering.x -= this.velocity.x;
                steering.y -= this.velocity.y;
                let steerMag = Math.hypot(steering.x, steering.y);
                if (steerMag > this.maxForce) {
                    steering.x = (steering.x / steerMag) * this.maxForce;
                    steering.y = (steering.y / steerMag) * this.maxForce;
                }
            }
        }
        return steering;
    }

    separation(boids) {
        let perceptionRadius = 30;
        let steering = { x: 0, y: 0 };
        let total = 0;

        for (let other of boids) {
            let d = Math.hypot(
                this.position.x - other.position.x,
                this.position.y - other.position.y
            );
            if (other !== this && d < perceptionRadius) {
                let diff = {
                    x: this.position.x - other.position.x,
                    y: this.position.y - other.position.y
                };
                diff.x /= d;
                diff.y /= d;
                steering.x += diff.x;
                steering.y += diff.y;
                total++;
            }
        }

        if (total > 0) {
            steering.x /= total;
            steering.y /= total;

            let mag = Math.hypot(steering.x, steering.y);
            if (mag > 0) {
                steering.x = (steering.x / mag) * this.maxSpeed;
                steering.y = (steering.y / mag) * this.maxSpeed;
                steering.x -= this.velocity.x;
                steering.y -= this.velocity.y;
                let steerMag = Math.hypot(steering.x, steering.y);
                if (steerMag > this.maxForce) {
                    steering.x = (steering.x / steerMag) * this.maxForce;
                    steering.y = (steering.y / steerMag) * this.maxForce;
                }
            }
        }
        return steering;
    }

    flock(boids) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);

        this.acceleration.x += separation.x * 1.5 + alignment.x + cohesion.x;
        this.acceleration.y += separation.y * 1.5 + alignment.y + cohesion.y;
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        let speed = Math.hypot(this.velocity.x, this.velocity.y);
        if (speed > this.maxSpeed) {
            this.velocity.x = (this.velocity.x / speed) * this.maxSpeed;
            this.velocity.y = (this.velocity.y / speed) * this.maxSpeed;
        }

        this.acceleration.x = 0;
        this.acceleration.y = 0;
    }
}

class FlockingSimulation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.boids = [];
        this.init();
    }

    init() {
        for (let i = 0; i < 100; i++) {
            this.boids.push(
                new Boid(
                    Math.random() * this.canvas.width,
                    Math.random() * this.canvas.height
                )
            );
        }
    }

    animate() {
        this.ctx.fillStyle = 'rgba(243, 244, 246, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let boid of this.boids) {
            boid.edges(this.canvas.width, this.canvas.height);
            boid.flock(this.boids);
            boid.update();

            this.ctx.beginPath();
            this.ctx.arc(boid.position.x, boid.position.y, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(107, 114, 128, 0.5)';
            this.ctx.fill();
        }

        requestAnimationFrame(() => this.animate());
    }
}