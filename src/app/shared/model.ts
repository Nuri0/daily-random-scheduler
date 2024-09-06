import { ChoiceGroup } from './choice-group';

export interface Config {
    groups: ChoiceGroup[];
    lastChoiceId: number;
    lastChoiceGroupId: number;
}