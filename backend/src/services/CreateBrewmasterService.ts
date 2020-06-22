import { getRepository } from 'typeorm';

import Brewmaster from '../models/Brewmaster';
import Beer from '../models/Beer';
import SocialMedia from '../models/SocialMedia';

interface IBeer {
  title: string;
  image: string;
  coloring: string;
  ibu: string;
  description: string;
}

interface Data {
  name: string;
  latitude: number;
  longitude: number;
  email: string;
  password: string;
  photo: string;
  city: string;
  uf: string;
  whatsapp: string;
  beer?: Beer;
  socialMedia?: SocialMedia;
}

class CreateBrewmasterService {
  public async execute({ email, ...rest }: Data): Promise<Brewmaster> {
    const brewmasterRepository = getRepository(Brewmaster);

    const findBrewmaster = await brewmasterRepository.findOne({
      where: {
        email,
      },
    });

    if (findBrewmaster) {
      throw new Error('Esse cervejeiro já existe!');
    }

    const brewmaster = await brewmasterRepository.create({
      ...rest,
      email,
    });

    await brewmasterRepository.save(brewmaster);

    delete brewmaster.password;

    return brewmaster;
  }
}

export default CreateBrewmasterService;
