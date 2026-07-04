export default function UploadBox({ setImage }) {
  return (
    <input
      type="file"
      onChange={(e) => setImage(e.target.files[0])}
      className="mb-4"
    />
  );
}