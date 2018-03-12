// package: api.v0alpha
// file: labels.proto

import * as jspb from "google-protobuf";
import * as google_api_annotations_pb from "./google/api/annotations_pb";
import * as matrix_labels_labels_pb from "./matrix/labels/labels_pb";

export class Label extends jspb.Message {
  getNodeId(): string;
  setNodeId(value: string): void;

  getLabelName(): string;
  setLabelName(value: string): void;

  getType(): matrix_labels_labels_pb.Type;
  setType(value: matrix_labels_labels_pb.Type): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Label.AsObject;
  static toObject(includeInstance: boolean, msg: Label): Label.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Label, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Label;
  static deserializeBinaryFromReader(message: Label, reader: jspb.BinaryReader): Label;
}

export namespace Label {
  export type AsObject = {
    nodeId: string,
    labelName: string,
    type: matrix_labels_labels_pb.Type,
  }
}

