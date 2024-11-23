import { DataSource } from "typeorm";
import { Driver } from "../entities/driver.entity";
import { LogService } from "../../../core/domains/log-service.type";
import { DriverInput } from "../../../modules/ride/domains/driver.model";

interface Props {
  dataSource: DataSource;
  logService: LogService;
}
export class DriverSeed {
  static async execute({ dataSource, logService }: Props) {
    const driverRepository = dataSource.getRepository(Driver);

    const existingDrivers = await driverRepository.find();
    if (existingDrivers.length > 0) {
      logService.log(
        "[Seed][Driver] Drivers already created, skiping the seed."
      );
      return;
    }

    const drivers: DriverInput[] = [
      {
        id: 1,
        tax: 2.5,
        valuation: 2,
        minimumKM: 1,
        name: "Homer Simpson",
        car: "Plymouth Valiant 1973 rosa e enferrujado",
        lastValuationMessage:
          "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
        description:
          "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
      },
      {
        id: 2,
        tax: 5,
        minimumKM: 5,
        valuation: 4,
        name: "Dominic Toretto",
        car: "Dodge Charger R/T 1970 modificado",
        lastValuationMessage:
          "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
        description:
          "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada",
      },
      {
        id: 3,
        tax: 10,
        valuation: 5,
        minimumKM: 10,
        name: "James Bond",
        car: "Aston Martin DB5 clássico",
        lastValuationMessage:
          "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto",
        description:
          "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem",
      },
    ];

    await driverRepository.save(drivers);

    logService.log("[Seed][Driver] Drivers created successfully.");
  }
}
