EntityRepository 해결법
TypeORM 3버전부터는 EntityRepository를 지원하지 않는다.

이를 최신버전에 맞게 적용하려면 repository.ts에서
@EntityRepository decorator를 @Injectable로 변경하고,
constructor(private dataSource:DataSource)
{
super.(Board, dataSource.createEntityManager());
}
를 추가해준다.

module.ts에서는
imports에서 TypeOrmModule.forFeature([BoardRepository])를
TypeOrmModule.forFeature([Board])로 변경하고

exports에 Service를 추가해준뒤

providers에 Repository를 추가한다.

됐냐?
