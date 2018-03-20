export interface GraphNode { id: number; type: string };
export interface Label { name: string; nodeId: number };
export interface UpdateLabel { name: string; nodeId: number; prevName: string };
