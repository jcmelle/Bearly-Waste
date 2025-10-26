import { useState, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
import Webcam from "react-webcam";
import RecycleMap from "../components/recyclemap";

export default function Recycle({ onAddXP }) {
  const [mode, setMode] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef();

  async function analyzeImage(imgEl) {
    setLoading(true);
    const model = await mobilenet.load();
    const predictions = await model.classify(imgEl);
    const item = predictions[0].className.toLowerCase();

    let category = "";
    if (
      item.includes("bottle") ||
      item.includes("can") ||
      item.includes("plastic") ||
      item.includes("cardboard") ||
      item.includes("metal") ||
      item.includes("glass") ||
      item.includes("jar") ||
      item.includes("aluminum") ||
      item.includes("tin") ||
      item.includes("paper") ||
      item.includes("carton") ||
      item.includes("foil") ||
      item.includes("magazine") ||
      item.includes("newspaper") ||
      item.includes("box")
    ) {
      category = "♻️ Recyclable! +5 XP";
      onAddXP?.(5);
    } else if (
      item.includes("banana") ||
      item.includes("apple") ||
      item.includes("food") ||
      item.includes("leaf") ||
      item.includes("paper towel") ||
      item.includes("napkin") ||
      item.includes("coffee grounds") ||
      item.includes("tea bag") ||
      item.includes("vegetable") ||
      item.includes("fruit") ||
      item.includes("bread") ||
      item.includes("egg shell") ||
      item.includes("yard waste") ||
      item.includes("plant") ||
      item.includes("flower")
    ) {
      category = "🌱 Compostable! +3 XP";
      onAddXP?.(3);
    } else {
      category = "🗑️ Probably Trash.";
    }

    setResult(`${category} (Detected: ${item})`);
    setLoading(false);
  }

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setMode("upload");

    const img = new Image();
    img.src = url;
    img.onload = () => analyzeImage(img);
  }

  async function handleCapture() {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    setImagePreview(imageSrc);

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => analyzeImage(img);
  }

  return (
    <div
      className="flex flex-col items-center justify-start text-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/pixil-frame-0_6.png')",
      }}
    >
      <div className="pt-10 flex flex-col items-center justify-center text-center h-full overflow-y-auto">
        <h2 className="mt-[-120px] text-[50px] font-bold text-white mb-4">
          Start Recycling!
        </h2>

        {/* Upload Photo */}
        <label className="mt-[-50px] text-[25px] px-6 py-3 bg-emerald-600 hover:scale-120 transition-transform duration-300 text-white rounded-xl shadow hover:bg-emerald-700 cursor-pointer mb-3">
          📁 Upload Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>

        {/* Live Camera */}
        <button
          onClick={() => setMode("camera")}
          className="px-6 py-3 bg-emerald-100 text-emerald-700 hover:scale-120 transition-transform duration-300 rounded-xl shadow hover:bg-emerald-200 mb-4"
        >
          📸 Open Live Camera
        </button>

        {mode === "camera" && (
          <div className="flex flex-col items-center">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              width={300}
              className="rounded-xl border border-emerald-300 mb-3"
              videoConstraints={{ facingMode: "environment" }}
            />
            <button
              onClick={handleCapture}
              className="px-5 py-2 bg-emerald-600 text-white rounded-xl shadow hover:bg-emerald-700"
            >
              Capture Photo
            </button>
          </div>
        )}

        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            className="w-48 h-48 object-cover rounded-xl border border-emerald-300 mt-4"
          />
          <button
            onClick={handleCapture}
            className="px-5 py-2 bg-emerald-600 text-white rounded-xl shadow hover:bg-emerald-700"
          >
            Capture Photo
          </button>
        </div>
      )}

      {/* Uploaded Image Preview */}
      {imagePreview && (
        <img
          src={imagePreview}
          alt="preview"
          className="w-48 h-48 object-cover rounded-xl border border-emerald-300 mt-4"
        />
      )}

      {/* Results + Map */}
      {loading && <p className="text-gray-600 mt-3">Analyzing image... ⏳</p>}
      {result && <p className="mt-3 text-lg">{result}</p>}

      {/* Google Map only shows if recyclable item detected */}
      {result.includes("Recyclable") && (
  <div className="w-full min-h-[400px] flex justify-center">
    <RecycleMap />
  </div>
)}
    </div>
  );
}

