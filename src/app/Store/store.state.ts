import { OblikaPodatkov } from "./interfaces/datagrid.model";

export interface store{
  data: OblikaPodatkov[];
  selectedData: OblikaPodatkov[];
  selectedGroups: any[];
}
