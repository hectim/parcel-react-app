// package: api.v0alpha
// file: labels.proto

import * as labels_pb from "./labels_pb";
import * as google_api_annotations_pb from "./google/api/annotations_pb";
import * as matrix_labels_labels_pb from "./matrix/labels/labels_pb";
export class Labels {
  static serviceName = "api.v0alpha.Labels";
}
export namespace Labels {
  export class GetLabelsByName {
    static readonly methodName = "GetLabelsByName";
    static readonly service = Labels;
    static readonly requestStream = false;
    static readonly responseStream = true;
    static readonly requestType = labels_pb.Label;
    static readonly responseType = labels_pb.Label;
  }
  export class GetLabelsByNode {
    static readonly methodName = "GetLabelsByNode";
    static readonly service = Labels;
    static readonly requestStream = false;
    static readonly responseStream = true;
    static readonly requestType = labels_pb.Label;
    static readonly responseType = labels_pb.Label;
  }
  export class AttachLabel {
    static readonly methodName = "AttachLabel";
    static readonly service = Labels;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = labels_pb.Label;
    static readonly responseType = labels_pb.Label;
  }
  export class RemoveLabel {
    static readonly methodName = "RemoveLabel";
    static readonly service = Labels;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = labels_pb.Label;
    static readonly responseType = labels_pb.Label;
  }
  export class GetLabelsByOrg {
    static readonly methodName = "GetLabelsByOrg";
    static readonly service = Labels;
    static readonly requestStream = false;
    static readonly responseStream = true;
    static readonly requestType = labels_pb.Label;
    static readonly responseType = labels_pb.Label;
  }
}
