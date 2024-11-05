import { MigrationInterface, QueryRunner } from 'typeorm';

export class Start1730692232455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
        CREATE TABLE users(
            id            INT AUTO_INCREMENT PRIMARY KEY,
            tax_id        VARCHAR(11) UNIQUE NOT NULL,
            name          VARCHAR(100)       NOT NULL,
            birth_date    DATE               NOT NULL,
            password      VARCHAR(200),

            street        VARCHAR(255),
            number        VARCHAR(10),
            complement    VARCHAR(255),
            neighborhood  VARCHAR(100),
            city          VARCHAR(100),
            state         VARCHAR(2),
            zip_code      VARCHAR(9),

            record_status ENUM ('active', 'removed') DEFAULT 'active',
            created_at    DATETIME                   DEFAULT CURRENT_TIMESTAMP,
            updated_at    DATETIME                   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            removed_at    DATETIME
        );

        CREATE TABLE user_logs(
            id         INT AUTO_INCREMENT PRIMARY KEY,
            user_id    INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            created_by INT REFERENCES users (id),
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            updated_by VARCHAR(50),
            removed_at DATETIME,
            removed_by VARCHAR(50)
        );

        INSERT INTO users (id, tax_id, name, birth_date, password, street, number, complement, neighborhood, city, state, zip_code, record_status, created_at, updated_at, removed_at) VALUES (1, '61033267023', 'admin', '1990-01-01', '6f00bbe26477cf4780b1d0abf3b20028:83184c79bba0d39f50cce2bee7bce34696d0c12cb4cffecac1463334cc8a918e5234f8f7f98a80170be7f41cc541244989b8ce7358e5f86caad3958087f2afcb', null, null, null, null, null, null, null, 'active', '2024-11-05 02:30:19', '2024-11-05 02:30:19', null);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS user_logs;
      DROP TABLE IF EXISTS users;
  `);
  }
}
