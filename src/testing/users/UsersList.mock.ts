import { RoleEnum } from '../../enums/role.enum';

export const UsersListMock = [
	{
		id: 3,
		FirstName: "Gabriel",
		LastName: "anacleto",
		email: "ga@adm.com",
		profileImage: "https://firebasestorage.googleapis.com/v0/b/modulo4-4f6b2.appspot.com/o/1705758993678.Jujutsu-Kaisen-1-1024x576?alt=media&token=88ae1504-6833-4a8b-be1e-ab9c46a1ce4e",
		role: RoleEnum.admin,
		credits: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
		deletedAt: null
	},
	{
		id: 4,
		FirstName: "anacleto",
		LastName: "anacleto",
		email: "ga@adm.com.br.br",
		profileImage: "https://firebasestorage.googleapis.com/v0/b/modulo4-4f6b2.appspot.com/o/1705762201236.Jujutsu-Kaisen-1-1024x576?alt=media&token=1b35ae4e-c6b9-424b-9b2e-c60c4c98dc0d",
		role: RoleEnum.customer,
		credits: 0,
		createdAt: "2024-01-20T14:50:03.093Z",
		updatedAt: "2024-01-20",
		deletedAt: null
	},
	{
		id: 5,
		FirstName: "Gabriel",
		LastName: "anacleto",
		email: "ga@ga.com",
		profileImage: "https://firebasestorage.googleapis.com/v0/b/modulo4-4f6b2.appspot.com/o/1705878389860.Jujutsu-Kaisen-1-1024x576?alt=media&token=eff027d3-a0d3-461c-afe9-7bae8100613e",
		role: RoleEnum.customer,
		credits: 0,
		createdAt: "2024-01-21T23:06:31.482Z",
		updatedAt: "2024-01-21",
		deletedAt: null
	},
	{
		id: 2,
		FirstName: "Gabriel",
		LastName: "anacleto",
		email: "ga@anacleto.com.br",
		profileImage: "https://firebasestorage.googleapis.com/v0/b/modulo4-4f6b2.appspot.com/o/1705758534270.Jujutsu-Kaisen-1-1024x576?alt=media&token=99ecee12-d995-4f96-b609-b80b34b75469",
		role: RoleEnum.customer,
		credits: 5,
		createdAt: "2024-01-20T13:48:55.357Z",
		updatedAt: "2024-01-20",
		deletedAt: null
	}
]