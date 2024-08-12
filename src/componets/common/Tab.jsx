export default function Tab({ tabData, field, setField }) {
  return (
    <div className="flex bg-black p-1 gap-x-1 my-6 rounded-full max-w-max">
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`${
            field === tab.type
              ? "bg-black text-richblack-5"
              : "bg-black text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200 focus:outline-none focus:shadow-outline`}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
}
