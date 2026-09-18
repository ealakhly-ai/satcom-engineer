import { IsNotEmpty } from 'class-validator';
export class AcceptProposalDto { @IsNotEmpty() proposalId: string; }