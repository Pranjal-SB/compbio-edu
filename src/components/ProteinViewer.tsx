import React, { useEffect, useRef, useState } from 'react';
import * as $3Dmol from '3dmol';

interface ProteinViewerProps {
  pdbData: string;
}

export const ProteinViewer: React.FC<ProteinViewerProps> = ({ pdbData }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstance = useRef<any>(null);
  const [representation, setRepresentation] = useState<'cartoon' | 'stick'>('cartoon');

  useEffect(() => {
    if (!viewerRef.current) return;

    viewerInstance.current = $3Dmol.createViewer(viewerRef.current, {
      backgroundColor: 'white'
    });

    return () => {
      if (viewerInstance.current) {
        viewerInstance.current.clear();
      }
    };
  }, []);

  useEffect(() => {
    if (!viewerInstance.current || !pdbData) return;

    const viewer = viewerInstance.current;
    viewer.clear();
    viewer.addModel(pdbData, 'pdb');
    
    if (representation === 'cartoon') {
      // Base style
      viewer.setStyle({}, {cartoon: {color: 'spectrum'}});
      // Secondary structure coloring
      viewer.setStyle({ss: 'h'}, {cartoon: {color: 'red'}});
      viewer.setStyle({ss: 's'}, {cartoon: {color: 'blue'}});
      viewer.setStyle({ss: 'c'}, {cartoon: {color: 'lightgray'}});
    } else {
      viewer.setStyle({}, {stick: {}});
    }
    
    viewer.zoomTo();
    viewer.render();
  }, [pdbData, representation]);

  return (
    <div className="bio-card p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-biology-ink">3D Structure</h3>
        <div className="flex gap-2">
          <button 
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${representation === 'cartoon' ? 'bg-biology-dna text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setRepresentation('cartoon')}
          >
            Cartoon
          </button>
          <button 
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${representation === 'stick' ? 'bg-biology-dna text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setRepresentation('stick')}
          >
            Stick
          </button>
        </div>
      </div>
      
      <div className="relative w-full h-[500px] rounded-xl overflow-hidden border border-gray-200 bg-white">
        <div ref={viewerRef} className="absolute inset-0" />
      </div>
      
      <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm">
        <p className="font-medium mb-1">Educational Note</p>
        <p>This 3D model shows the protein's structure. Red = alpha helices, Blue = beta sheets.</p>
      </div>
    </div>
  );
};
