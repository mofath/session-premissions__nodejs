import { v4 as uuidv4 } from 'uuid';
import { CreateResourceDto } from '../core/dto/create-resource.dto';
import { Resource } from '../core/domain/resource';
import { NotFoundError } from '../core/errors';

export default class ResourceRepositoty {
  private static resources: Resource[] = [];

  public static getAllResources = (): Resource[] => {
    return this.resources;
  };

  public static getResourceById(id: string): Resource {
    const found = this.resources.find((task) => task.id === id);
    if (!found) throw new NotFoundError(`Task with ${id} not found`);

    return found;
  }

  public static createResource(params: CreateResourceDto): Resource {
    const newResource: Resource = {
      ...params,
      id: uuidv4(),
    };
    this.resources.push(newResource);

    return newResource;
  }

  public static updateResource(id: string, title: string): Resource {
    this.resources = this.resources.map((resource: Resource) =>
      resource.id === id ? { ...resource, title } : resource
    );

    return {
      id,
      title,
    };
  }
}
