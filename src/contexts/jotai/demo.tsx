import { atom, useAtom } from 'jotai';

// Basic atoms
export const countAtom = atom(0);
export const nameAtom = atom('Guest');

// Derived atom (computed state)
export const greetingAtom = atom(
  (get) => `Hello, ${get(nameAtom)}! You clicked ${get(countAtom)} times.`
);

// Atom with write function
export const doubleCountAtom = atom(
  (get) => get(countAtom) * 2,
  (get, set, newValue: number) => {
    // When setting doubleCountAtom, we actually set countAtom to half the value
    set(countAtom, newValue / 2);
  }
);

// Demo component
export function JotaiDemo() {
  const [count, setCount] = useAtom(countAtom);
  const [name, setName] = useAtom(nameAtom);
  const [greeting] = useAtom(greetingAtom);
  const [doubleCount, setDoubleCount] = useAtom(doubleCountAtom);

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold">Jotai Demo</h1>

      <div className="space-y-2">
        <p>{greeting}</p>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={() => setCount((c) => c + 1)}
          >
            Increment Count
          </button>
          <span>Count: {count}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 bg-green-500 text-white rounded"
            onClick={() => setDoubleCount(doubleCount + 2)}
          >
            Increment Double Count
          </button>
          <span>Double Count: {doubleCount}</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            className="border px-2 py-1 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
      </div>
    </div>
  );
}
