'use client';

export default function SizeChart() {
  return (
    <dialog id="size-chart" className="modal bg-transparent">
      <div className="bg-surface p-8 rounded-lg max-w-2xl w-full">
        <h2 className="heading-2 mb-6">Size Guide</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-lootix-silver/20">
                <th className="p-4">Size</th>
                <th className="p-4">Chest (in)</th>
                <th className="p-4">Length (in)</th>
                <th className="p-4">Sleeve (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-lootix-silver/20">
                <td className="p-4">S</td>
                <td className="p-4">36-38</td>
                <td className="p-4">28</td>
                <td className="p-4">24</td>
              </tr>
              <tr className="border-b border-lootix-silver/20">
                <td className="p-4">M</td>
                <td className="p-4">39-41</td>
                <td className="p-4">29</td>
                <td className="p-4">24.5</td>
              </tr>
              <tr className="border-b border-lootix-silver/20">
                <td className="p-4">L</td>
                <td className="p-4">42-44</td>
                <td className="p-4">30</td>
                <td className="p-4">25</td>
              </tr>
              <tr className="border-b border-lootix-silver/20">
                <td className="p-4">XL</td>
                <td className="p-4">45-47</td>
                <td className="p-4">31</td>
                <td className="p-4">25.5</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-sm text-lootix-silver">
          <p>Measurements are approximate. Please allow for slight variations.</p>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => {
              const dialog = document.getElementById('size-chart') as HTMLDialogElement;
              dialog?.close();
            }}
            className="btn btn-primary"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
} 