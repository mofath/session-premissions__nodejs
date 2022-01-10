import ResourceRepositoty from '../../repositories/resource.repository';
import { Request, Response } from 'express';

export default class ResourceConteoller {
  public static getAllResources(req: Request, res: Response) {
    const result = ResourceRepositoty.getAllResources();
    return res.status(200).json({
      resources: result,
      success: true,
      message: 'Resources fetched successfully.',
    });
  }

  public static getResourceById(req: Request, res: Response) {
    const { id } = req.params;
    const result = ResourceRepositoty.getResourceById(id);
    return res.status(200).json({
      data: result,
      success: true,
      message: 'Resources fetched successfully.',
    });
  }

  public static createResource(req: Request, res: Response) {
    const { title } = req.body;
    const result = ResourceRepositoty.createResource({ title });
    return res.status(201).json({
      data: result,
      success: true,
      message: 'Resource created successfully.',
    });
  }

  public static updateResource(req: Request, res: Response) {
    const { id } = req.params;
    const { title } = req.body;
    const result = ResourceRepositoty.updateResource(id, title);
    return res.status(201).json({
      data: result,
      success: true,
      message: 'Resource updated successfully.',
    });
  }
}
