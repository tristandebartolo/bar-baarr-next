// Component
export default function loading() {

  return (
    <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center">
      <span className="animate-spin block w-14 h-14 mt-4 border-4 border-gray-300 border-t-one rounded-full"></span>
    </div>
  );
}
