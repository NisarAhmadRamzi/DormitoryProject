<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;


class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        // حذف کش قبلی
        // app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            'AdminDashboard',
            'StudentDashboard',
            'LibraryAdminDashboard',
            'LibraryStudentDashboard',

            'all users',
            'view user',
            'create user',
            'edit user',
            'delete user',
            'assign user role',

            'all students',
            'view student',
            'create student',
            'edit student',
            'delete student',
            'restore student',

            'all rooms',
            'view room',
            'create room',
            'edit room',
            'delete room',

            'all roles',
            'view role',
            'create role',
            'edit role',
            'delete role',
            'assign role permissions',

            'all permissions',
            'view permission',
            'create permission',
            'edit permission',
            'delete permission',

            'all library students',
            'view library student',
            'create library student',
            'edit library student',
            'delete library student',

            'all libraries',
            'view library',
            'create library',
            'edit library',
            'delete library',

            'all fees',
            'view fee',
            'create fee',
            'edit fee',
            'delete fee',

            'all assets',
            'view asset',
            'create asset',
            'edit asset',
            'delete asset',

            'all supports',
            'view support',
            'create support',
            'edit support',
            'delete support',

            'all expenses',
            'view expense',
            'create expense',
            'edit expense',
            'delete expense',

            'all complaints',
            'view complaint',
            'create complaint',
            'edit complaint',
            'delete complaint',

            'all borrowed books',
            'view borrowed book',
            'create borrowed book',
            'edit borrowed book',
            'delete borrowed book',

            'all books',
            'view book',
            'create book',
            'edit book',
            'delete book',
        ];

        foreach ($permissions as $permission) {
            \Spatie\Permission\Models\Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'sanctum']);
        }
        // Assign permissions to roles
        $adminRole = \Spatie\Permission\Models\Role::findByName('admin', 'sanctum');
        $adminRole->givePermissionTo($permissions);

        $second_admin = \Spatie\Permission\Models\Role::findByName('second_admin', 'sanctum');
        $second_admin->givePermissionTo([
            'AdminDashboard',

            'all users',
            'view user',

            'all students',
            'view student',

            'all rooms',
            'view room',

            'all roles',
            'view role',

            'all permissions',
            'view permission',

            'all library students',
            'view library student',

            'all libraries',
            'view library',

            'all fees',
            'view fee',
            'create fee',
            'edit fee',
            'delete fee',

            'all assets',
            'view asset',
            'create asset',
            'edit asset',
            'delete asset',

            'all supports',
            'view support',
            'create support',
            'edit support',
            'delete support',

            'all expenses',
            'view expense',
            'create expense',
            'edit expense',
            'delete expense',


            'all complaints',
            'view complaint',

            'all borrowed books',
            'view borrowed book',

            'all books',
            'view book',

        ]);

        $student = \Spatie\Permission\Models\Role::findByName('student', 'sanctum');
        $student->givePermissionTo([

            'StudentDashboard',


            'all students',
            'view student',

            'all rooms',
            'view room',

            'view fee',

            'view complaint',
            'create complaint',
            'delete complaint',

            'all borrowed books',
            'view borrowed book',

            'all books',
            'view book',

        ]);

        $library_admin = \Spatie\Permission\Models\Role::findByName('library_admin', 'sanctum');
        $library_admin->givePermissionTo([
            'LibraryAdminDashboard',

            'all users',
            'view user',
            'create user',
            'edit user',
            'delete user',

            'all library students',
            'view library student',
            'create library student',
            'edit library student',
            'delete library student',

            'all libraries',
            'view library',

            'all complaints',
            'view complaint',
            'create complaint',
            'edit complaint',
            'delete complaint',

            'all borrowed books',
            'view borrowed book',
            'create borrowed book',
            'edit borrowed book',
            'delete borrowed book',

            'all books',
            'view book',
            'create book',
            'edit book',
            'delete book',

        ]);

        $library_student = \Spatie\Permission\Models\Role::findByName('library_student', 'sanctum');
        // Assign permissions to library student role
        $library_student->givePermissionTo([
            'LibraryStudentDashboard',

            'view user',

            'view library student',

            'view library',

            'view complaint',
            'create complaint',
            'delete complaint',

            'all borrowed books',
            'view borrowed book',

            'all books',
            'view book',
        ]);
    }
}
