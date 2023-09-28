import {createPool, FieldPacket, Pool, ResultSetHeader, RowDataPacket} from "mysql2/promise"
import UserQuery from "./db_user_querys"
import RackQuery from "./db_rack_querys"
import SensorQuery from "./db_sensor_querys"
import SensorDataQuery from "./db_sensor_data_querys"
import QueryCollection from "./query_collection"

export default class DataBase extends QueryCollection {
	public readonly user: UserQuery
	public readonly rack: RackQuery
	public readonly sensor: SensorQuery
	public readonly sensor_data: SensorDataQuery

	constructor(host: string, password: string) {
		super(
			createPool({
				uri: host,
				namedPlaceholders: true,
				password: password,
				database: "yurisense",
				charset: "utf8"
			})
		)

		this.user = new UserQuery(this)
		this.rack = new RackQuery(this)
		this.sensor = new SensorQuery(this)
		this.sensor_data = new SensorDataQuery(this)
	}
}
