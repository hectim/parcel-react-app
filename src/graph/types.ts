export interface GraphNode { id: number; type: string, img: string };
export interface UpdateGraphNode { id: number, type: string, img: string, prevImg: string };
export interface Label { img: string; nodeId: number };
export interface UpdateLabel { img: string; nodeId: number; prevImg: string };
