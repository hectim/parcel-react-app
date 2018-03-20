export interface GraphNode { id: number; type: string, img: string };
export interface Label { img: string; nodeId: number };
export interface UpdateLabel { img: string; nodeId: number; prevImg: string };
