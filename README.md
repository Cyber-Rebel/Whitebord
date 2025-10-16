
zz---

## 1️⃣ **Canvas Element Properties & Methods**

| Function / Property                          | Use / Meaning                                                             |
| -------------------------------------------- | ------------------------------------------------------------------------- |
| `canvas.width` / `canvas.height`             | Canvas ki **internal pixel size** set karte hain.                         |
| `canvas.style.width` / `canvas.style.height` | Canvas ka **display size** (CSS)                                          |
| `canvas.getContext('2d')`                    | Drawing surface milta hai (lines, shapes, text, images)                   |
| `canvas.getBoundingClientRect()`             | Canvas ka **position & size in viewport**; mouse events map karne ke liye |
| `canvas.toDataURL()`                         | Canvas ko **image (PNG/JPG)** me convert karne ke liye                    |

---

## 2️⃣ **2D Context (`ctx`) Functions — Drawing Tools**

| Function                                      | Meaning                                               |
| --------------------------------------------- | ----------------------------------------------------- |
| `ctx.beginPath()`                             | Start new shape / line path                           |
| `ctx.moveTo(x, y)`                            | Pen ko **starting point** pe le jao (without drawing) |
| `ctx.lineTo(x, y)`                            | Pen se **line draw karo last point se**               |
| `ctx.stroke()`                                | Draw outline of path                                  |
| `ctx.fill()`                                  | Fill the shape with color                             |
| `ctx.closePath()`                             | Connect last point → first point (polygon)            |
| `ctx.arc(x, y, radius, startAngle, endAngle)` | Draw circle or arc                                    |
| `ctx.fillRect(x, y, w, h)`                    | Rectangle filled                                      |
| `ctx.strokeRect(x, y, w, h)`                  | Rectangle outline                                     |
| `ctx.clearRect(x, y, w, h)`                   | Erase / clear part of canvas                          |

---

## 3️⃣ **Styling Properties**

| Property           | Meaning                                                |
| ------------------ | ------------------------------------------------------ |
| `ctx.strokeStyle`  | Line color                                             |
| `ctx.fillStyle`    | Fill color                                             |
| `ctx.lineWidth`    | Line thickness                                         |
| `ctx.lineCap`      | Line end style (`butt`, `round`, `square`)             |
| `ctx.lineJoin`     | Corners of connected lines (`miter`, `round`, `bevel`) |
| `ctx.font`         | Text font and size                                     |
| `ctx.textAlign`    | Text horizontal alignment (`left`,`center`,`right`)    |
| `ctx.textBaseline` | Text vertical alignment (`top`,`middle`,`bottom`)      |

---

## 4️⃣ **Curves & Complex Paths**

| Function                                 | Use                           |
| ---------------------------------------- | ----------------------------- |
| `ctx.quadraticCurveTo(cx, cy, x, y)`     | Curve with one control point  |
| `ctx.bezierCurveTo(c1x,c1y,c2x,c2y,x,y)` | Curve with two control points |

---

## 5️⃣ **Transform / State**

| Function                       | Use                                                       |
| ------------------------------ | --------------------------------------------------------- |
| `ctx.save()` / `ctx.restore()` | Save & restore canvas state (color, lineWidth, transform) |
| `ctx.translate(x, y)`          | Move canvas origin                                        |
| `ctx.rotate(angle)`            | Rotate canvas (radians)                                   |
| `ctx.scale(x, y)`              | Resize shapes                                             |

---

## 6️⃣ **Mouse / Pointer Related**

* `canvas.getBoundingClientRect()` → Canvas position & size in browser
* Mouse event properties:

  * `event.clientX` → Mouse X (viewport)
  * `event.clientY` → Mouse Y (viewport)
* Convert to canvas coordinate:

```js
const rect = canvas.getBoundingClientRect();
const x = event.clientX - rect.left;
const y = event.clientY - rect.top;
```

---

## 7️⃣ **Animation / Frame**

| Function                    | Use                              |
| --------------------------- | -------------------------------- |
| `requestAnimationFrame(fn)` | Animate / redraw canvas smoothly |

---


---

### 🔹 Line:

```js
const clicked = shapes.find(
  (shape) =>
    Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2) <= shape.radius
);
```

---

### 🔹 Meaning:

1. **`x, y`** — mouse click ke coordinates hain (canvas ke andar).

2. **`shape.x, shape.y`** — circle ka center point hai.

3. **`Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2)`**

   * Yeh **distance formula** hai (Pythagoras theorem).
   * Ye batata hai: click point center se kitna door hai.

4. **`<= shape.radius`**

   * Agar yeh distance **circle ke radius se chhota ya barabar** hai → matlab click **circle ke andar** hua hai.

---

### 🔹 So:

* Agar click circle ke andar hua, to condition `true` return karegi.
* `Array.find()` first matching shape ko return karega.
* Agar koi circle match nahi hua → `clicked` undefined rahega.

---

### 🔹 Example:

Circle ka center `(210, 210)`
Radius = `50`

Click `(220, 220)` par hua
→ Distance = √((220-210)² + (220-210)²) = √(100 + 100) = 14.14
→ 14.14 ≤ 50 → **click circle ke andar**

Isliye `clicked` variable me wo shape mil jata hai.

---

Simple words me:
**Ye line detect karti hai ki user ne kis circle ke andar double-click kiya.**
