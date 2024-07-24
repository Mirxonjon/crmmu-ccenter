import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSectionCategoryDto } from './dto/create_section_categories.dto';
import { UpdateSectionCategoryDto } from './dto/update_section_categories.dto';
import { Category_Section_Entity } from 'src/entities/category_org.entity';
import { Between, ILike, Like,  } from 'typeorm';
import { Sub_Category_Section_Entity } from 'src/entities/sub_category_org.entity';
import { Region_Entity } from 'src/entities/region.entity';
import { ApplicationCallCenterEntity } from 'src/entities/applicationCallCenter.entity';
@Injectable()
export class SectionCategoriesService {
  async findallstatisticsfilter( 
    categoryId: string,
    subCategoryId: string,
    region: string,
    fromDate: string,
    untilDate: string,
    pageNumber = 1,
    pageSize = 10){
      const offset = (pageNumber - 1) * pageSize;

      if (fromDate == 'null' && untilDate == 'null' ) {
        const findRegions = await Region_Entity.find({
          where: {
            id: region == 'null' ? null : region
          },
          order: {
            create_data: 'desc'
          }
        });
        
        let arr = [];
        
        await Promise.all(
          findRegions.map(async (e) => {
            try {
              const results = await Category_Section_Entity.find({
                where: {
                  id: categoryId == 'null' ? null : categoryId,
                  sub_category_orgs: {
                    id: subCategoryId == 'null' ? null : subCategoryId,
                    applicationCallcenter: {
                      IsDraf: 'false',
                      districts: {
                        region: {
                          id: e.id
                        }
                      }
                    }
                  }
                },
                relations: {
                  sub_category_orgs: {
                    applicationCallcenter: {
                      districts: {
                        region: true
                      }
                    }
                  }
                },
                order: {
                  create_data: 'desc'
                }
              });
        
              results.forEach(item => {
                item.sub_category_orgs.forEach(subCategory => {
                  arr.push({
                    ...item,
                    sub_category_orgs: {
                      ...subCategory,
                      count: subCategory.applicationCallcenter.length,
                      region: e
                    }
                  });
                });
              });
            } catch (error) {
              throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
            }
          })
        );

       arr.sort((a, b) => b.sub_category_orgs.count - a.sub_category_orgs.count);

        const totalItems = arr.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const paginatedResults = arr.slice(offset, offset + pageSize);
  
        return {
          results: paginatedResults,
          pagination: {
            currentPage: pageNumber,
            totalPages,
            pageSize,
            totalItems: totalItems,
          },
        };
      } 
      
    //   else if (fromDate == 'null' || untilDate == 'null') {

    //     const [results, total] = await Category_Section_Entity.findAndCount({
    //       where: {
    //         id: categoryId == 'null' ? null : categoryId,
    //         sub_category_orgs :{
    //           id: subCategoryId == 'null' ? null : subCategoryId,
    //           applicationCallcenter :{
    //             IsDraf: 'false',
    //             districts :{
    //               region : {
    //                 id: region == 'null' ? null : region,
    //                }
    //             }
    //           }
    //         }
    //       },
    //       relations: {
    //        sub_category_orgs: {
    //         applicationCallcenter: {
    //           districts: {
    //             region: true
    //           },
    //         }
    //        },
    //     },
    //       skip: offset,
    //       take: pageSize,
    //       order: {
    //         create_data: 'desc',
    //       },
    //     }).catch((e) => {
    //       throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    //     });

    //     let arr = [ ]
    // results.forEach(item  => {
    //       item.sub_category_orgs.forEach(subCategory => {
    //         arr.push({
    //           ...item,
    //           sub_category_orgs: {...subCategory,
    //           count : subCategory.applicationCallcenter.length,
    //            region :   subCategory.applicationCallcenter[0].districts.region
    //       }
    //         })
    //       });
    //   });

    //   console.log(arr , 'okkk');
      
  
    //     const totalPages = Math.ceil(total / pageSize);
  
    //     return {
          
    //       results : arr,
    //       pagination: {
    //         currentPage: pageNumber,
    //         totalPages,
    //         pageSize,
    //         totalItems: total,
    //       },
    //     };
    //   }
      
      else {
        const fromDateFormatted = new Date(
          parseInt(fromDate.split('.')[2]),
          parseInt(fromDate.split('.')[1]) - 1,
          parseInt(fromDate.split('.')[0]),
        );
        const untilDateFormatted = new Date(
          parseInt(untilDate.split('.')[2]),
          parseInt(untilDate.split('.')[1]) - 1,
          parseInt(untilDate.split('.')[0]),
        );
  
        const [results , total] = await Category_Section_Entity.findAndCount({
          where: {
            id: categoryId == 'null' ? null : categoryId,
            sub_category_orgs :{
              id: subCategoryId == 'null' ? null : subCategoryId,
              applicationCallcenter :{
                IsDraf: 'false',
                districts :{
                  region : {
                    id: region == 'null' ? null : region,
                   }
                },
                create_data: Between(fromDateFormatted, untilDateFormatted),
              }
            }
          },
          relations: {
           sub_category_orgs: {
            applicationCallcenter: {
              districts: {
                region: true
              },
            }
           },
        },
          skip: offset,
          take: pageSize,
          order: {
            create_data: 'desc',
          },
        }).catch((e) => {
          throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        });
        let arr = [ ]
        let   resultsa : any = results.forEach(item  => {
          item.sub_category_orgs.forEach(subCategory => {

            arr.push({
              item,
              subCategory,
              count : subCategory.applicationCallcenter.length 
            })
              // subCategory.count = subCategory.applicationCallcenter.length ;
          });
      });

      console.log(arr , 'okkk');
      

  
        const totalPages = Math.ceil(total / pageSize);
  
        return {
          arr,
          results,
          pagination: {
            currentPage: pageNumber,
            totalPages,
            pageSize,
            totalItems: total,
          },
        };
      }
  }

  async findallAllstatisticsFilterWithRegion(regionId :string , fromDate: string, untilDate: string,){

    if(fromDate == 'null' || untilDate == 'null'  ) {
      let findRegions = null
      if(regionId != 'null'){
         findRegions = await Region_Entity.findOne({
          where : {
            id : regionId == 'null' ? null: regionId 
          }
        });
      }

      
      const Applicationcount = await ApplicationCallCenterEntity.count({
        where : {
          districts : {
            region :{
              id: regionId == 'null' ? null : regionId
            }
          }
        }
      })
      const ApplicationExplainedcount = await ApplicationCallCenterEntity.count({
        where : {
          response : 'Тушунтирилган',
          districts : {
            region :{
              id: regionId == 'null' ? null : regionId
            }
          }
        },

      })

      const ApplicationSatisfiedcount = await ApplicationCallCenterEntity.count({
        where : {
          response : 'Қаноатлантирилган',
          districts : {
            region :{
              id: regionId == 'null' ? null : regionId
            }
          }
        },
        
      })

      const ApplicationLeftunseencount = await ApplicationCallCenterEntity.count({
        where : {
          response : 'Кўрмасдан қолдирилган',
          districts : {
            region :{
              id: regionId == 'null' ? null : regionId
            }
          }
        }
      })

      const ApplicationAnonymouscount = await ApplicationCallCenterEntity.count({
        where : {
          response : 'Аноним',
          districts : {
            region :{
              id: regionId == 'null' ? null : regionId
            }
          }
        }
      })

      return  {
        findRegions,
        Applicationcount,
        ApplicationExplainedcount,
        ApplicationSatisfiedcount,
        ApplicationLeftunseencount,
        ApplicationAnonymouscount
      }
    
    }else {
      const fromDateFormatted = new Date(
        parseInt(fromDate.split('.')[2]),
        parseInt(fromDate.split('.')[1]) - 1,
        parseInt(fromDate.split('.')[0]),
      );
      const untilDateFormatted = new Date(
        parseInt(untilDate.split('.')[2]),
        parseInt(untilDate.split('.')[1]) - 1,
        parseInt(untilDate.split('.')[0]),
      );

      let findRegions = null
      if(regionId != 'null'){
         findRegions = await Region_Entity.findOne({
          where : {
            id : regionId == 'null' ? null: regionId 
          }
        });
      }
        
        const Applicationcount = await ApplicationCallCenterEntity.count({
          where : {
            districts : {
              region :{
                id: regionId == 'null' ? null : regionId
              }
            },
            create_data: Between(fromDateFormatted, untilDateFormatted),
          }
        })
        const ApplicationExplainedcount = await ApplicationCallCenterEntity.count({
          where : {
            response : 'Тушунтирилган',
            districts : {
              region :{
                id: regionId == 'null' ? null : regionId
              }
            },
            create_data: Between(fromDateFormatted, untilDateFormatted),
          },
  
        })
  
        const ApplicationSatisfiedcount = await ApplicationCallCenterEntity.count({
          where : {
            response : 'Қаноатлантирилган',
            districts : {
              region :{
                id: regionId == 'null' ? null : regionId
              }
            },
            create_data: Between(fromDateFormatted, untilDateFormatted),
          },
          
        })
  
        const ApplicationLeftunseencount = await ApplicationCallCenterEntity.count({
          where : {
            response : 'Кўрмасдан қолдирилган',
            districts : {
              region :{
                id: regionId == 'null' ? null : regionId
              }
            },
            create_data: Between(fromDateFormatted, untilDateFormatted),
          }
        })
  
        const ApplicationAnonymouscount = await ApplicationCallCenterEntity.count({
          where : {
            response : 'Аноним',
            districts : {
              region :{
                id: regionId == 'null' ? null : regionId
              }
            },
            create_data: Between(fromDateFormatted, untilDateFormatted),
          }
        })
  
        return  {
          findRegions,
          Applicationcount,
          ApplicationExplainedcount,
          ApplicationSatisfiedcount,
          ApplicationLeftunseencount,
          ApplicationAnonymouscount
        }
    } 



  }


  async findallAllstatisticsWithRegion( fromDate: string, untilDate: string) {
    if(fromDate == 'null' || untilDate == 'null'  ) {
      const ApplicationAllcount = await ApplicationCallCenterEntity.count()
      const findRegions = await Region_Entity.find({
        order: {
          create_data: 'desc'
        }
      });

      let  allResultat = []

      for(let e of findRegions) {
        const findApplication = await ApplicationCallCenterEntity.count({
          where : {
            districts : {
              region : {
                id : e.id 
              }
            }
          }
        })

        allResultat.push({
          ...e,
          applicationCountRegion: findApplication,
          ApplicationAllcount ,
          percentage : findApplication/ApplicationAllcount * 100 ,
        })
      }
      return allResultat
    } else {

      const fromDateFormatted = new Date(
        parseInt(fromDate.split('.')[2]),
        parseInt(fromDate.split('.')[1]) - 1,
        parseInt(fromDate.split('.')[0]),
      );
      const untilDateFormatted = new Date(
        parseInt(untilDate.split('.')[2]),
        parseInt(untilDate.split('.')[1]) - 1,
        parseInt(untilDate.split('.')[0]),
      );

      const ApplicationAllcount = await ApplicationCallCenterEntity.count({
        where :{
          create_data : Between(fromDateFormatted, untilDateFormatted),
        }
      })
      const findRegions = await Region_Entity.find({
        order: {
          create_data: 'desc'
        }
      });

      let  allResultat = []

      for(let e of findRegions) {
        const findApplication = await ApplicationCallCenterEntity.count({
          where : {
              create_data : Between(fromDateFormatted, untilDateFormatted),
            districts : {
              region : {
                id : e.id 
              }
            }
          }
        })

        allResultat.push({
          ...e,
          applicationCountRegion: findApplication,
          ApplicationAllcount ,
          percentage : findApplication/ApplicationAllcount * 100 ,
        })
      }
      return allResultat
    }
  }

  async findAll(  title : string,  pageNumber = 1,
    pageSize = 10,) {
      const offset = (pageNumber - 1) * pageSize;
    const [results, total] = await Category_Section_Entity.findAndCount({
where : {
title : title == 'null' ? null: ILike(`%${title}%`),

},

      relations : {
       sub_category_orgs : true
      },
      order: {
        create_data: 'desc',
      },

      select : {
        id: true,
        title :true,
        create_data :true,
        update_date :true,
        sub_category_orgs : {
          id:true
        } ,
      },
      skip: offset,
      take: pageSize,
    }).catch(
      (e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      },
    );

    const resultsWithCount = results.map(result => ({
      ...result,
      sub_category_orgs: result.sub_category_orgs.length,
    })); 
    const totalPages = Math.ceil(total / pageSize);
    return {
      results : resultsWithCount,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        pageSize,
        totalItems: total,
      },
    };
  }

  async findOne(id: string , title: string , pageNumber = 1,
    pageSize = 10) {
      const offset = (pageNumber - 1) * pageSize;
    const  [results, total]  =
      await Sub_Category_Section_Entity.findAndCount({
        where: {
          title: title == 'null' ? null : ILike(`%${title}%`),
          category_org : {
            id :id
          }
        },
        relations: {
          category_org: true,
        },

        skip: offset,
        take: pageSize,
      }).catch(
        (e) => {
          throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        },
      );
      const totalPages = Math.ceil(total / pageSize);

      return {
        results ,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          pageSize,
          totalItems: total,
        },
      };
  }

  async create(body: CreateSectionCategoryDto) {
    const findCategory = await Category_Section_Entity.findOneBy({
      title: body.title,
    });

    if (findCategory) {
      throw new HttpException(
        'Already created this category',
        HttpStatus.FOUND,
      );
    }
    await Category_Section_Entity.createQueryBuilder()
      .insert()
      .into(Category_Section_Entity)
      .values({
        title: body.title.toLowerCase(),
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async update(id: string, body: UpdateSectionCategoryDto) {
    const findCategory = await Category_Section_Entity.findOneBy({
      id: id,
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findCategory) {
      throw new HttpException('Not found Category', HttpStatus.NOT_FOUND);
    }

    await Category_Section_Entity.createQueryBuilder()
      .update(Category_Section_Entity)
      .set({
        title: body.title.toLowerCase() || findCategory.title,
      })
      .where({ id })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async remove(id: string) {
    const findCategory = await Category_Section_Entity.findOneBy({
      id: id,
    }).catch((e) => {
      console.log(e);
      
      throw new HttpException('Not found Category', HttpStatus.BAD_REQUEST);
    });
    console.log(findCategory);
    if (!findCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    // await Category_Section_Entity.createQueryBuilder()
    //   .delete()
    //   .from(Category_Section_Entity)
    //   .where({ id })
    //   .execute();

      await Category_Section_Entity.delete({ id }).catch((e) => {
        console.log(e);
        
        throw new HttpException('Not found Category', HttpStatus.BAD_REQUEST);
      });;
  }
}
