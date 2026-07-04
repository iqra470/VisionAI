export default function ResultCard({ caption, prompt, image }) {
  return (
    <div className="p-4 border rounded mt-4">
      <p><strong>Caption:</strong> {caption}</p>
      <p><strong>Prompt:</strong></p>
      <code className="block bg-gray-200 p-2">{prompt}</code>
      <img src={image} alt="generated" className="mt-2" />
    </div>
  );
}