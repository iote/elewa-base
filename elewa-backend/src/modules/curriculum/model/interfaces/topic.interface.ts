import { SubTopic } from './sub-topic.interface';

export interface Topic {

  _id?: String;

  name: String;

  subTopics: SubTopic[];

  legacyId: Number;
}
