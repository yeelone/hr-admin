export class Audit {
    id: number;
    subject: string;
    object: string;
    action: number;
    fields: string;
    org_object: number;
    dest_object: number;
    state: number;
    reply: string;
    body: string;
    operator: string;
    auditor: string;
}

export enum ACTION {
   AUDITCREATEACTION = 1,
   AUDITUPDATEACTION = 2,
   AUDITDELETEACTION = 3,
   AUDITQUERYACTION  = 4,
}

export enum AuditState {
    AuditStateWaiting = 0,
    AuditStatePermit  = 1,
    AuditStateDeny    = 2,
}
export const AuditStateMap = {
    0 : '待审核',
    1 : '通过',
    2 : '不通过'
};
