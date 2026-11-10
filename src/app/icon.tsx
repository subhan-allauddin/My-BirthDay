import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          background: "linear-gradient(135deg, #7c3aed, #c026d3, #06b6d4)",
          color: "#ffffff",
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.04em",
        }}
      >
        ASA
      </div>
    ),
    { ...size }
  );
}
